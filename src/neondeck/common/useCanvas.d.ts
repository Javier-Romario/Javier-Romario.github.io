import * as React from 'react';
import type { CanvasTheme } from './theme';
export type CanvasDrawFn = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number, frame: number, 
/** Theme palette resolved through the cascade; follows light/dark and tint classes. */
theme: CanvasTheme) => void;
/**
 * Owns a <canvas>'s DPR-aware sizing + rAF loop and calls the latest `draw`
 * every frame. `draw` is stored in a ref so prop changes never restart the
 * loop — only `fps` does.
 */
export declare function useCanvas(draw: CanvasDrawFn, fps?: number): React.RefObject<HTMLCanvasElement | null>;
