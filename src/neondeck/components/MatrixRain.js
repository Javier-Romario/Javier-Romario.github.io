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
const KATAKANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFXYZ';
const MatrixRain = (_a) => {
    var { height, color, fontSize = 16, speed = 1, density = 0.9 } = _a, rest = __rest(_a, ["height", "color", "fontSize", "speed", "density"]);
    const state = React.useRef(null);
    const draw = React.useCallback((ctx, w, h, _t, _frame, theme) => {
        const fg = color !== null && color !== void 0 ? color : theme.green;
        const cols = Math.max(1, Math.floor(w / fontSize));
        if (!state.current || state.current.cols !== cols) {
            const drops = new Array(cols).fill(0).map(() => Math.floor(Math.random() * -40));
            const speeds = new Array(cols).fill(0).map(() => 0.4 + Math.random() * 0.9);
            state.current = { cols, drops, speeds };
        }
        const s = state.current;
        // translucent fade leaves ghost trails
        ctx.fillStyle = withAlpha(theme.bg, 0.14);
        ctx.fillRect(0, 0, w, h);
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
        for (let i = 0; i < s.cols; i++) {
            if (Math.random() > density)
                continue;
            const char = KATAKANA[Math.floor(Math.random() * KATAKANA.length)];
            const x = i * fontSize;
            const y = s.drops[i] * fontSize;
            ctx.fillStyle = fg;
            ctx.fillText(char, x, y);
            if (y > h && Math.random() > 0.975) {
                s.drops[i] = 0;
            }
            else {
                s.drops[i] += s.speeds[i] * speed;
            }
        }
    }, [color, fontSize, speed, density]);
    return _jsx(CanvasShell, Object.assign({ draw: draw, height: height, fps: 30 }, rest));
};
export default MatrixRain;
