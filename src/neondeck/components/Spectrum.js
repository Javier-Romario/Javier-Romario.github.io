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
const Spectrum = (_a) => {
    var { height, color, bars = 48, speed = 0.12, glow = true } = _a, rest = __rest(_a, ["height", "color", "bars", "speed", "glow"]);
    const state = React.useRef(null);
    const draw = React.useCallback((ctx, w, h, _t, _frame, theme) => {
        const fg = color !== null && color !== void 0 ? color : theme.fg;
        if (!state.current) {
            state.current = {
                targets: new Array(bars).fill(0.2),
                values: new Array(bars).fill(0.1),
            };
        }
        const s = state.current;
        for (let i = 0; i < bars; i++) {
            if (Math.random() < 0.05)
                s.targets[i] = 0.15 + Math.random() * 0.85;
            s.values[i] += (s.targets[i] - s.values[i]) * speed;
        }
        ctx.clearRect(0, 0, w, h);
        const gap = Math.max(1, (w / bars) * 0.22);
        const bw = (w - gap * (bars - 1)) / bars;
        for (let i = 0; i < bars; i++) {
            const bh = s.values[i] * h * 0.85;
            const x = i * (bw + gap);
            const y = h - bh;
            if (glow) {
                ctx.shadowColor = fg;
                ctx.shadowBlur = 8;
            }
            const grad = ctx.createLinearGradient(0, y, 0, h);
            grad.addColorStop(0, fg);
            grad.addColorStop(1, withAlpha(fg, 0.15));
            ctx.fillStyle = grad;
            ctx.fillRect(x, y, bw, bh);
            ctx.shadowBlur = 0;
        }
    }, [bars, speed, glow, color]);
    return _jsx(CanvasShell, Object.assign({ draw: draw, height: height }, rest));
};
export default Spectrum;
