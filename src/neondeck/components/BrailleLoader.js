'use client';
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './BrailleLoader.module.css';
const DEFAULT_CELLS = {
    spin: 1,
    pulse: 1,
    wave: 8,
    rain: 10,
    bar: 8,
};
/**
 * Braille-cell loader driven entirely by CSS: an `@property`-registered integer
 * is animated with `steps()`, and a `@counter-style` maps that integer onto
 * braille glyphs via `content: counter()`. No JS timers, no re-renders.
 */
const BrailleLoader = (_a) => {
    var { variant = 'spin', tone = 'teal', cells, speed, glitch = false, size, label, className, style } = _a, rest = __rest(_a, ["variant", "tone", "cells", "speed", "glitch", "size", "label", "className", "style"]);
    const count = variant === 'spin' || variant === 'pulse' ? 1 : Math.max(1, cells !== null && cells !== void 0 ? cells : DEFAULT_CELLS[variant]);
    const vars = Object.assign(Object.assign(Object.assign({}, (speed ? { '--bl-speed': `${speed}s` } : null)), (size !== undefined ? { fontSize: typeof size === 'number' ? `${size}px` : size } : null)), style);
    return (_jsxs("span", Object.assign({ role: "status", "aria-busy": "true", "aria-label": label || 'Loading', className: [styles.root, className].filter(Boolean).join(' '), "data-variant": variant, "data-tone": tone, "data-glitch": glitch || undefined, style: vars }, rest, { children: [_jsx("span", { className: styles.cells, "aria-hidden": "true", children: Array.from({ length: count }, (_, i) => (_jsx("span", { className: styles.cell, style: { '--i': i } }, i))) }), label ? _jsx("span", { className: styles.label, children: label }) : null] })));
};
export default BrailleLoader;
