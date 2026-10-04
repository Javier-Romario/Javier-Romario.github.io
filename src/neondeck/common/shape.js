/**
 * Chamfered-panel geometry. Builds CSS `polygon()` strings made only of
 * horizontal, vertical and 45° edges — corner chamfers plus any number of
 * trapezoid notches along each side (Wipeout-style HUD panels).
 *
 * Every coordinate is a linear `pct% + px` pair, so the polygon stays
 * responsive (`calc()`), and an exact inward offset can be derived for
 * the border ring without measuring the DOM.
 */
const EDGES = [
    { side: 'top', start: [0, 0], dir: [1, 0], n: [0, 1], c0: 'tl', c1: 'tr' },
    { side: 'right', start: [1, 0], dir: [0, 1], n: [-1, 0], c0: 'tr', c1: 'br' },
    { side: 'bottom', start: [1, 1], dir: [-1, 0], n: [0, -1], c0: 'br', c1: 'bl' },
    { side: 'left', start: [0, 1], dir: [0, -1], n: [1, 0], c0: 'bl', c1: 'tl' },
];
function parseAt(at) {
    if (typeof at === 'number')
        return { p: 0, px: at };
    const m = /^(-?\d+(?:\.\d+)?)%$/.exec(at.trim());
    return { p: m ? parseFloat(m[1]) : 0, px: 0 };
}
const add = (a, b) => ({ p: a.p + b.p, px: a.px + b.px });
const sub = (a, b) => ({ p: a.p - b.p, px: a.px - b.px });
function buildPoints(cuts) {
    var _a, _b, _c, _d;
    const pts = [];
    for (const e of EDGES) {
        const [sx, sy] = e.start;
        const [dx, dy] = e.dir;
        const [nx, ny] = e.n;
        // point at distance `t` along the edge, `k` px inward
        const at = (t, k = 0) => ({
            x: { p: sx * 100 + dx * t.p, px: dx * t.px + nx * k },
            y: { p: sy * 100 + dy * t.p, px: dy * t.px + ny * k },
        });
        const cStart = (_a = cuts[e.c0]) !== null && _a !== void 0 ? _a : 0;
        const cEnd = (_b = cuts[e.c1]) !== null && _b !== void 0 ? _b : 0;
        pts.push(at({ p: 0, px: cStart }));
        for (const notch of (_c = cuts[e.side]) !== null && _c !== void 0 ? _c : []) {
            const w = Math.max(0, notch.width);
            const d = Math.min((_d = notch.depth) !== null && _d !== void 0 ? _d : 8, w / 2);
            let t0 = parseAt(notch.at);
            if (notch.anchor === 'center')
                t0 = sub(t0, { p: 0, px: w / 2 });
            if (notch.anchor === 'end')
                t0 = sub(t0, { p: 0, px: w });
            pts.push(at(t0));
            pts.push(at(add(t0, { p: 0, px: d }), d));
            pts.push(at(add(t0, { p: 0, px: w - d }), d));
            pts.push(at(add(t0, { p: 0, px: w })));
        }
        pts.push(at({ p: 100, px: -cEnd }));
    }
    // drop consecutive duplicates (square corners emit the same point twice)
    const same = (a, b) => a.x.p === b.x.p && a.x.px === b.x.px && a.y.p === b.y.p && a.y.px === b.y.px;
    // keep the first point; drop any point equal to its predecessor, and a
    // trailing point equal to the first (closing duplicate)
    const out = pts.filter((p, i) => i === 0 || !same(p, pts[i - 1]));
    if (out.length > 1 && same(out[out.length - 1], out[0]))
        out.pop();
    return out;
}
/** Move every vertex inward by `d` px, keeping the 45° / axis-aligned edges parallel. */
function inset(pts, d) {
    if (d === 0)
        return pts;
    // evaluate on a nominal box just to read edge directions
    const W = 1000;
    const H = 1000;
    const ev = (p) => [(p.x.p / 100) * W + p.x.px, (p.y.p / 100) * H + p.y.px];
    const P = pts.map(ev);
    const n = pts.length;
    const normal = (i) => {
        const [ax, ay] = P[i];
        const [bx, by] = P[(i + 1) % n];
        const dx = bx - ax;
        const dy = by - ay;
        const len = Math.hypot(dx, dy) || 1;
        return [-dy / len, dx / len]; // inward for a clockwise walk in screen space
    };
    return pts.map((pt, i) => {
        const [n1x, n1y] = normal((i + n - 1) % n);
        const [n2x, n2y] = normal(i);
        const k = 1 + n1x * n2x + n1y * n2y;
        const s = d / (k < 1e-6 ? 1 : k);
        return {
            x: { p: pt.x.p, px: pt.x.px + (n1x + n2x) * s },
            y: { p: pt.y.p, px: pt.y.px + (n1y + n2y) * s },
        };
    });
}
const r = (v) => Math.round(v * 1000) / 1000;
function fmt({ p, px }) {
    if (p === 0)
        return `${r(px)}px`;
    if (px === 0)
        return `${r(p)}%`;
    return `calc(${r(p)}% ${px < 0 ? '-' : '+'} ${r(Math.abs(px))}px)`;
}
const fmtPt = (p) => `${fmt(p.x)} ${fmt(p.y)}`;
function loop(pts) {
    return pts.map(fmtPt);
}
/**
 * @param cuts   corner chamfers + edge notches
 * @param border border ring width in px
 * @param bleed  how far past the box the halo may extend, px
 */
export function shapePaths(cuts, border = 1.5, bleed = 120) {
    const outerPts = buildPoints(cuts);
    const innerPts = inset(outerPts, border);
    const o = loop(outerPts);
    const i = loop(innerPts);
    const huge = [
        `${-bleed}px ${-bleed}px`,
        `calc(100% + ${bleed}px) ${-bleed}px`,
        `calc(100% + ${bleed}px) calc(100% + ${bleed}px)`,
        `${-bleed}px calc(100% + ${bleed}px)`,
    ];
    return {
        outer: `polygon(${o.join(', ')})`,
        inner: `polygon(${i.join(', ')})`,
        // bridge segments are traversed twice in opposite directions → zero area under evenodd
        ring: `polygon(evenodd, ${[...o, o[0], ...i, i[0], o[0]].join(', ')})`,
        halo: `polygon(evenodd, ${[...huge, huge[0], ...o, o[0], huge[0]].join(', ')})`,
    };
}
/** Ready-made shapes. `sm` ≈ the old single-chamfer card; the rest are notched. */
export const PANEL_SHAPES = {
    /** two opposite chamfers — matches the legacy Card */
    slab: { tl: 18, br: 18 },
    /** all four corners chamfered, no square corner */
    chamfer: { tl: 16, tr: 16, br: 16, bl: 16 },
    /** chamfers + stepped notches on every side */
    wipeout: {
        tl: 22,
        tr: 12,
        br: 22,
        bl: 12,
        top: [
            { at: 64, width: 28, depth: 6 },
            { at: '70%', width: 44, depth: 10 },
        ],
        right: [{ at: '38%', width: 30, depth: 8 }],
        bottom: [
            { at: 64, width: 44, depth: 10 },
            { at: '38%', width: 24, depth: 6 },
        ],
        left: [{ at: '30%', width: 30, depth: 8 }],
    },
    /** tab-like: big lead-in chamfer + one notch either end */
    terminal: {
        tl: 28,
        tr: 10,
        br: 28,
        bl: 10,
        top: [{ at: '60%', width: 36, depth: 9 }],
        bottom: [{ at: '40%', width: 36, depth: 9 }],
    },
};
