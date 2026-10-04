import * as React from 'react';
import type { HologramShape } from './Hologram';
import type { NeonTone } from './Ticker';
/** Glyph ramp, sparse → dense. Index 0 must be a space: empty cells render nothing. */
export declare const ASCII_RAMP = " .:-=+*#%@";
/** Silhouette outline glyphs, indexed by gradient angle: vertical, diagonal, horizontal, anti-diagonal. */
export declare const EDGE_CHARS = "|/-\\";
interface AsciiSceneProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Built-in shape; ignored when `children` supplies a custom scene. */
    shape?: HologramShape;
    /** Glyph colour for lit surfaces. */
    tone?: NeonTone;
    /** Glyph colour for shadowed surfaces and the outline. Default magenta. */
    accent?: NeonTone;
    /** Glyph ramp, sparse → dense. Keep index 0 a space. */
    characters?: string;
    /** Glyph cell height in px. Width follows the mono aspect (0.6). Default 14. */
    cell?: number;
    height?: number | string;
    /** Rotation speed multiplier. */
    speed?: number;
    interactive?: boolean;
    /** Sobel outline of the silhouette in `| / - \` glyphs. */
    edges?: boolean;
    /** Hash-ordered reveal of the cells on mount (ms). 0 disables. */
    reveal?: number;
    /** Periodic row tearing + channel split. */
    glitch?: boolean;
    /** Slow vertical scanline sweep. */
    scanlines?: boolean;
    /** Drop-shadow glow on the glyph layer. */
    glow?: boolean;
    /** Corner readout text. */
    label?: string;
    children?: React.ReactNode;
}
declare const AsciiScene: React.FC<AsciiSceneProps>;
export default AsciiScene;
