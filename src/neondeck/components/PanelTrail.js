import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./PanelTrail.module.css";
import Panel from "./Panel.js";
import Ticker from "./Ticker.js";
const PAD = 6; // room for glow + bend nodes
/** Parse `"h20 u14 h28"` → segments. Unknown tokens are ignored. */
export function parseRoute(route) {
    const out = [];
    for (const tok of route.trim().split(/\s+/)) {
        const m = /^([hud])(\d+(?:\.\d+)?)$/i.exec(tok);
        if (m)
            out.push({
                kind: m[1].toLowerCase(),
                len: parseFloat(m[2]),
            });
    }
    return out;
}
/** Walk a route outward from the panel edge; every u/d step is 45°. */
export function routeGeometry(route, capH) {
    const pts = [[0, 0]];
    let x = 0;
    let y = 0;
    for (const s of parseRoute(route)) {
        x += s.len;
        if (s.kind === "u")
            y -= s.len;
        if (s.kind === "d")
            y += s.len;
        pts.push([x, y]);
    }
    const ys = pts.map((p) => p[1]);
    const yMin = Math.min(...ys, y - capH / 2);
    const yMax = Math.max(...ys, y + capH / 2);
    return { pts, yEnd: y, svgW: x + PAD, svgH: yMax - yMin + PAD * 2, shift: -yMin + PAD };
}
const PanelTrail = ({ side, route = "h20 u14 h28 d14 h20", anchor = 0.5, tone = "teal", capWidth = 180, capHeight = 26, noCap = false, items = [], label, speed = 18, direction, }) => {
    const capH = noCap ? 0 : capHeight;
    const { pts, yEnd, svgW, svgH, shift } = routeGeometry(route, capH);
    const points = pts.map(([px, py]) => `${px},${py + shift}`).join(" ");
    const bends = pts.slice(1, -1);
    // the whole trail is positioned so the line origin lands on the anchor
    const originY = shift; // y of the first point inside the svg
    const anchorCss = anchor <= 1 ? `${anchor * 100}%` : `${anchor}px`;
    const rowStyle = {
        "--trail-origin": `${originY}px`,
        "--trail-anchor": anchorCss,
        width: svgW + (noCap ? 0 : capWidth),
    };
    const flip = side === "before";
    const half = capH / 2;
    // pointed end faces the line; small chamfers on the far end
    const capShape = flip
        ? { tr: half, br: half, tl: 5, bl: 5 }
        : { tl: half, bl: half, tr: 5, br: 5 };
    return (_jsx("div", { className: styles.trail, "data-side": side, "data-tone": tone, style: rowStyle, "aria-hidden": "true", children: _jsxs("div", { className: styles.inner, children: [_jsxs("svg", { className: styles.line, width: svgW, height: svgH, viewBox: `0 0 ${svgW} ${svgH}`, style: flip ? { transform: "scaleX(-1)" } : undefined, children: [_jsx("polyline", { points: points }), bends.map(([bx, by], i) => (_jsx("rect", { x: bx - 2, y: by + shift - 2, width: 4, height: 4, transform: `rotate(45 ${bx} ${by + shift})` }, i)))] }), noCap ? null : (_jsx(Panel, { shape: capShape, tone: tone, border: 1, className: styles.cap, style: {
                        width: capWidth,
                        height: capH,
                        marginTop: yEnd + shift - half,
                        "--panel-pad": "0",
                    }, children: _jsx(Ticker, { className: styles.ticker, items: items, label: label, tone: tone, speed: speed, direction: direction }) }))] }) }));
};
export default PanelTrail;
