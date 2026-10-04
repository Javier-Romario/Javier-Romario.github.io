import * as React from 'react';
/**
 * Palette handed to canvas / WebGL components. Values are CSS colour
 * expressions; they are resolved through the cascade at runtime (so
 * light-dark(), var() and tint classes all apply) and re-read whenever
 * the theme changes.
 */
export declare const CANVAS_THEME: {
    /** primary neon: lines, text, nodes */
    readonly fg: "var(--theme-focused-foreground)";
    /** secondary neon: suns, RGB splits, halos */
    readonly accent: "var(--theme-accent)";
    /** third neon for RGB splits */
    readonly accent2: "light-dark(#0891b2, #2de2ff)";
    /** matrix green */
    readonly green: "light-dark(#009e60, #00ff9d)";
    /** page / canvas backdrop */
    readonly bg: "var(--theme-background-solid)";
    readonly bg2: "var(--cp-bg-2)";
    readonly panel: "var(--theme-panel)";
    readonly text: "var(--theme-text)";
    readonly muted: "var(--theme-muted)";
    /** darkening colour for scanlines, vignettes, trails */
    readonly shade: "light-dark(#3c5a6e, #000000)";
};
export type CanvasTheme = {
    [K in keyof typeof CANVAS_THEME]: string;
};
/** Resolve each expression to a computed colour by assigning it to `el.style.color`. */
export declare function resolveThemeColors<M extends Record<string, string>>(el: HTMLElement, map: M): {
    [K in keyof M]: string;
};
/** Re-run `cb` whenever the theme can change: html/body attributes or the OS scheme. */
export declare function observeTheme(cb: () => void): () => void;
/**
 * Hook form: resolves `map` against `ref.current` and keeps it current.
 * Returns the palette as state (for React props) and as a ref (for rAF loops).
 */
export declare function useThemeColors<M extends Record<string, string>>(ref: React.RefObject<HTMLElement | null>, map: M): {
    colors: { [K in keyof M]: string; };
    colorsRef: React.RefObject<{ [K in keyof M]: string; }>;
};
/** `withAlpha('rgb(0, 255, 209)', 0.4)` → `rgba(0, 255, 209, 0.4)`. Accepts hex, rgb(), rgba(); anything else is returned unchanged. */
export declare function withAlpha(color: string, alpha: number): string;
