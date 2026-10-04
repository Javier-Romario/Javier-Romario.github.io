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
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import CanvasShell from './CanvasShell.js';
const GlitchText = (_a) => {
    var { text, color, accentA, accentB, fontSize = 44, height = 160, glitchRate = 0.08, intensity = 6 } = _a, rest = __rest(_a, ["text", "color", "accentA", "accentB", "fontSize", "height", "glitchRate", "intensity"]);
    const draw = React.useCallback((ctx, w, h, _t, _frame, theme) => {
        const fg = color !== null && color !== void 0 ? color : theme.fg;
        const a = accentA !== null && accentA !== void 0 ? accentA : theme.accent;
        const b = accentB !== null && accentB !== void 0 ? accentB : theme.accent2;
        ctx.clearRect(0, 0, w, h);
        const fs = Math.min(fontSize, h * 0.6);
        ctx.font = `700 ${fs}px 'JetBrains Mono', monospace`;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        const cx = w / 2;
        const cy = h / 2;
        // continuous micro-jitter + RGB split
        const jx = (Math.random() - 0.5) * intensity * 0.6;
        const jy = (Math.random() - 0.5) * intensity * 0.4;
        const split = intensity * 0.5;
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = a;
        ctx.fillText(text, cx - split + jx, cy + jy);
        ctx.fillStyle = b;
        ctx.fillText(text, cx + split + jx, cy + jy);
        ctx.globalAlpha = 1;
        ctx.fillStyle = fg;
        ctx.fillText(text, cx + jx, cy + jy);
        // periodic slice glitch: displace horizontal bands
        if (Math.random() < glitchRate) {
            const bands = 1 + Math.floor(Math.random() * 3);
            for (let i = 0; i < bands; i++) {
                const sy = Math.random() * h;
                const sh = 3 + Math.random() * 14;
                const dx = (Math.random() - 0.5) * intensity * 4;
                ctx.drawImage(ctx.canvas, 0, sy, w, sh, dx, sy, w, sh);
            }
        }
    }, [text, color, accentA, accentB, fontSize, glitchRate, intensity]);
    return _jsx(CanvasShell, Object.assign({ draw: draw, height: height }, rest));
};
export default GlitchText;
