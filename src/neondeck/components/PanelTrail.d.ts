import * as React from "react";
import { NeonTone } from "./Ticker";
export interface TrailProps {
    /**
     * Lead-line route, walking *away* from the panel. Space-separated segments:
     * `h<px>` horizontal, `u<px>` / `d<px>` 45° up / down (px is horizontal extent).
     * Default `'h20 u14 h28 d14 h20'`.
     */
    route?: string;
    /** Where the line leaves the panel edge: fraction of height (0–1) or px from top. Default 0.5. */
    anchor?: number;
    tone?: NeonTone;
    /** Cap width in px. Default 180. */
    capWidth?: number;
    /** Cap height in px. Default 26. */
    capHeight?: number;
    /** Omit the ticker cap — just the line. */
    noCap?: boolean;
    items?: string[];
    label?: string;
    speed?: number;
    direction?: "left" | "right";
}
interface PanelTrailProps extends TrailProps {
    /** Which side of the panel the trail sits on. */
    side: "before" | "after";
}
export type Seg = {
    kind: "h" | "u" | "d";
    len: number;
};
/** Parse `"h20 u14 h28"` → segments. Unknown tokens are ignored. */
export declare function parseRoute(route: string): Seg[];
export interface RouteGeometry {
    /** Polyline points, origin (0,0) at the panel edge, before shifting. */
    pts: [number, number][];
    /** y of the last point (cap centre) before shifting. */
    yEnd: number;
    svgW: number;
    svgH: number;
    /** Added to every y so the drawing fits in the svg with PAD around it. */
    shift: number;
}
/** Walk a route outward from the panel edge; every u/d step is 45°. */
export declare function routeGeometry(route: string, capH: number): RouteGeometry;
declare const PanelTrail: React.FC<PanelTrailProps>;
export default PanelTrail;
