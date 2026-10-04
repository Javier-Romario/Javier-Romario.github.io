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
const HexGrid = (_a) => {
    var { height, color, size = 26, pulseRate = 0.4, glow = true } = _a, rest = __rest(_a, ["height", "color", "size", "pulseRate", "glow"]);
    const draw = React.useCallback((ctx, w, h, t, _frame, theme) => {
        const fg = color !== null && color !== void 0 ? color : theme.fg;
        ctx.clearRect(0, 0, w, h);
        const rowH = Math.sqrt(3) * size;
        const colW = 1.5 * size;
        const cols = Math.ceil(w / colW) + 2;
        const rows = Math.ceil(h / rowH) + 2;
        const cx = w / 2;
        const cy = h / 2;
        const maxR = Math.max(w, h) * 0.7;
        const waveR = ((t * pulseRate) % 1) * maxR;
        ctx.lineWidth = 1;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const x = c * colW;
                const y = r * rowH + (c % 2 ? rowH / 2 : 0);
                const d = Math.hypot(x - cx, y - cy);
                const inWave = Math.abs(d - waveR) < size * 1.7;
                ctx.beginPath();
                for (let k = 0; k < 6; k++) {
                    const a = (Math.PI / 3) * k;
                    const px = x + size * Math.cos(a);
                    const py = y + size * Math.sin(a);
                    if (k === 0)
                        ctx.moveTo(px, py);
                    else
                        ctx.lineTo(px, py);
                }
                ctx.closePath();
                if (inWave && glow) {
                    ctx.strokeStyle = fg;
                    ctx.shadowColor = fg;
                    ctx.shadowBlur = 10;
                    ctx.stroke();
                    ctx.fillStyle = withAlpha(fg, 0.07);
                    ctx.fill();
                }
                else {
                    ctx.strokeStyle = withAlpha(fg, 0.28);
                    ctx.shadowBlur = 0;
                    ctx.stroke();
                }
            }
        }
        ctx.shadowBlur = 0;
    }, [color, size, pulseRate, glow]);
    return _jsx(CanvasShell, Object.assign({ draw: draw, height: height }, rest));
};
export default HexGrid;
