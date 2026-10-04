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
import { withAlpha } from '../common/theme.js';
const Waveform = (_a) => {
    var { height, color, speed = 1, amplitude = 0.32, layers = 3, glitch = 0.08 } = _a, rest = __rest(_a, ["height", "color", "speed", "amplitude", "layers", "glitch"]);
    const draw = React.useCallback((ctx, w, h, t, _frame, theme) => {
        const fg = color !== null && color !== void 0 ? color : theme.fg;
        ctx.clearRect(0, 0, w, h);
        // faint baseline grid
        ctx.strokeStyle = withAlpha(theme.muted, 0.25);
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 1; i < 4; i++) {
            const y = (h / 4) * i;
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
        }
        ctx.stroke();
        const mid = h / 2;
        ctx.lineWidth = 2;
        ctx.shadowColor = fg;
        ctx.shadowBlur = 14;
        for (let L = 0; L < layers; L++) {
            const freq = 1 + L * 2.3;
            const amp = (amplitude * h * 0.5) / (1 + L * 0.6);
            ctx.strokeStyle = L === 0 ? fg : withAlpha(fg, Math.max(0.05, 0.4 - L * 0.1));
            ctx.beginPath();
            for (let x = 0; x <= w; x += 2) {
                const nx = x / w;
                const y = mid +
                    Math.sin(nx * Math.PI * 2 * freq + t * speed * 2) * amp +
                    Math.sin(nx * Math.PI * 6 + t * speed * 4) * amp * 0.3;
                if (x === 0)
                    ctx.moveTo(x, y);
                else
                    ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
        // glitch spikes
        if (Math.random() < glitch) {
            const gx = Math.random() * w;
            const gy = Math.random() * h;
            ctx.strokeStyle = fg;
            ctx.globalAlpha = 0.9;
            ctx.beginPath();
            ctx.moveTo(gx, gy);
            ctx.lineTo(gx + (Math.random() - 0.5) * 60, gy + (Math.random() - 0.5) * 60);
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
        ctx.shadowBlur = 0;
    }, [color, speed, amplitude, layers, glitch]);
    return _jsx(CanvasShell, Object.assign({ draw: draw, height: height }, rest));
};
export default Waveform;
