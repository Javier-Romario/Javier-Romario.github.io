import * as React from 'react';
import type { NeonTone } from './Ticker';
export type BrailleVariant = 'spin' | 'wave' | 'rain' | 'pulse' | 'bar';
interface BrailleLoaderProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
    variant?: BrailleVariant;
    tone?: NeonTone;
    /** Number of braille cells for the multi-cell variants. Ignored by `spin` / `pulse`. */
    cells?: number;
    /** Seconds per full cycle. */
    speed?: number;
    /** Chromatic-aberration flicker + sliced ghost layer. */
    glitch?: boolean;
    /** Font size of the glyphs; number = px. */
    size?: number | string;
    /** Text after the glyphs, e.g. "LOADING". */
    label?: string;
}
/**
 * Braille-cell loader driven entirely by CSS: an `@property`-registered integer
 * is animated with `steps()`, and a `@counter-style` maps that integer onto
 * braille glyphs via `content: counter()`. No JS timers, no re-renders.
 */
declare const BrailleLoader: React.FC<BrailleLoaderProps>;
export default BrailleLoader;
