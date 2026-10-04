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
const Radar = (_a) => {
    var { height, color, sweepSpeed = 0.4, blipRate = 0.03, maxBlips = 24 } = _a, rest = __rest(_a, ["height", "color", "sweepSpeed", "blipRate", "maxBlips"]);
    const state = React.useRef(null);
    const draw = React.useCallback((ctx, w, h, t, _frame, theme) => {
        const fg = color !== null && color !== void 0 ? color : theme.fg;
        const cx = w / 2;
        const cy = h / 2;
        const r = Math.min(w, h) / 2 - 12;
        if (!state.current)
            state.current = { cx, cy, r, blips: [] };
        const s = state.current;
        s.cx = cx;
        s.cy = cy;
        s.r = r;
        // translucent fade leaves sweeping trails
        ctx.fillStyle = withAlpha(theme.bg, 0.1);
        ctx.fillRect(0, 0, w, h);
        // rings + cross
        ctx.strokeStyle = withAlpha(fg, 0.35);
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (const f of [1, 0.66, 0.33]) {
            ctx.arc(cx, cy, r * f, 0, Math.PI * 2);
        }
        ctx.moveTo(cx - r, cy);
        ctx.lineTo(cx + r, cy);
        ctx.moveTo(cx, cy - r);
        ctx.lineTo(cx, cy + r);
        ctx.stroke();
        // spawn blips
        if (Math.random() < blipRate && s.blips.length < maxBlips) {
            const a = Math.random() * Math.PI * 2;
            const d = Math.sqrt(Math.random()) * r;
            s.blips.push({ x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d, age: 0 });
        }
        // draw blips (fade with age)
        for (let i = s.blips.length - 1; i >= 0; i--) {
            const b = s.blips[i];
            b.age += 1;
            if (b.age > 160) {
                s.blips.splice(i, 1);
                continue;
            }
            const alpha = Math.max(0, 1 - b.age / 160);
            ctx.fillStyle = withAlpha(fg, alpha);
            ctx.beginPath();
            ctx.arc(b.x, b.y, 2.5, 0, Math.PI * 2);
            ctx.fill();
        }
        // sweep: bright leading line + trailing ghosts
        const angle = t * sweepSpeed * Math.PI * 2;
        for (let g = 0; g < 10; g++) {
            const a = angle - g * 0.06;
            ctx.strokeStyle = withAlpha(fg, 0.8 - g * 0.075);
            ctx.lineWidth = g === 0 ? 2 : 1;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
            ctx.stroke();
        }
    }, [color, sweepSpeed, blipRate, maxBlips]);
    return _jsx(CanvasShell, Object.assign({ draw: draw, height: height }, rest));
};
export default Radar;
