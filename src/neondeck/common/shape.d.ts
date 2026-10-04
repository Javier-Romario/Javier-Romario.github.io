/**
 * Chamfered-panel geometry. Builds CSS `polygon()` strings made only of
 * horizontal, vertical and 45° edges — corner chamfers plus any number of
 * trapezoid notches along each side (Wipeout-style HUD panels).
 *
 * Every coordinate is a linear `pct% + px` pair, so the polygon stays
 * responsive (`calc()`), and an exact inward offset can be derived for
 * the border ring without measuring the DOM.
 */
export interface Notch {
    /** Position along the edge: px from the edge start, or a `'NN%'` string. */
    at: number | string;
    /** Opening width of the notch at the edge, in px. */
    width: number;
    /** How far the notch cuts in, in px. Clamped to `width / 2` (45° sides). Default 8. */
    depth?: number;
    /** What `at` refers to on the notch. Default `'start'`. */
    anchor?: 'start' | 'center' | 'end';
}
export interface Cuts {
    /** Corner chamfers, px. A corner left at 0 stays square. */
    tl?: number;
    tr?: number;
    br?: number;
    bl?: number;
    /** Notches per side; `at` counts along the clockwise walk (see note below). */
    top?: Notch[];
    right?: Notch[];
    bottom?: Notch[];
    left?: Notch[];
}
export interface ShapePaths {
    /** Full silhouette. */
    outer: string;
    /** Silhouette inset by the border width — the glass fill. */
    inner: string;
    /** Outer minus inner (evenodd) — the neon edge. */
    ring: string;
    /** Everything *outside* the silhouette — clips the shadow/glow layer so it never tints the glass. */
    halo: string;
}
/**
 * @param cuts   corner chamfers + edge notches
 * @param border border ring width in px
 * @param bleed  how far past the box the halo may extend, px
 */
export declare function shapePaths(cuts: Cuts, border?: number, bleed?: number): ShapePaths;
/** Ready-made shapes. `sm` ≈ the old single-chamfer card; the rest are notched. */
export declare const PANEL_SHAPES: {
    /** two opposite chamfers — matches the legacy Card */
    slab: {
        tl: number;
        br: number;
    };
    /** all four corners chamfered, no square corner */
    chamfer: {
        tl: number;
        tr: number;
        br: number;
        bl: number;
    };
    /** chamfers + stepped notches on every side */
    wipeout: {
        tl: number;
        tr: number;
        br: number;
        bl: number;
        top: ({
            at: number;
            width: number;
            depth: number;
        } | {
            at: string;
            width: number;
            depth: number;
        })[];
        right: {
            at: string;
            width: number;
            depth: number;
        }[];
        bottom: ({
            at: number;
            width: number;
            depth: number;
        } | {
            at: string;
            width: number;
            depth: number;
        })[];
        left: {
            at: string;
            width: number;
            depth: number;
        }[];
    };
    /** tab-like: big lead-in chamfer + one notch either end */
    terminal: {
        tl: number;
        tr: number;
        br: number;
        bl: number;
        top: {
            at: string;
            width: number;
            depth: number;
        }[];
        bottom: {
            at: string;
            width: number;
            depth: number;
        }[];
    };
};
export type PanelShape = keyof typeof PANEL_SHAPES;
