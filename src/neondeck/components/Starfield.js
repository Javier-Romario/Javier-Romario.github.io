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
function makeStar() {
    const a = Math.random() * Math.PI * 2;
    return { ux: Math.cos(a), uy: Math.sin(a), z: 1 };
}
const Starfield = (_a) => {
    var { height, color, count = 220, speed = 1 } = _a, rest = __rest(_a, ["height", "color", "count", "speed"]);
    const stars = React.useRef(null);
    const draw = React.useCallback((ctx, w, h, _t, _frame, theme) => {
        const fg = color !== null && color !== void 0 ? color : theme.fg;
        if (!stars.current) {
            stars.current = new Array(count).fill(0).map(() => makeStar());
        }
        const s = stars.current;
        const cx = w / 2;
        const cy = h / 2;
        const R = Math.max(w, h) * 0.62;
        ctx.clearRect(0, 0, w, h);
        for (const st of s) {
            const prevZ = st.z;
            st.z -= 0.02 * speed;
            if (st.z <= 0.04) {
                Object.assign(st, makeStar());
                continue;
            }
            const px = cx + (st.ux * R) / st.z;
            const py = cy + (st.uy * R) / st.z;
            const pp = cx + (st.ux * R) / prevZ;
            const ppy = cy + (st.uy * R) / prevZ;
            const alpha = Math.min(1, (1 - st.z) * 2);
            ctx.strokeStyle = withAlpha(fg, alpha);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pp, ppy);
            ctx.lineTo(px, py);
            ctx.stroke();
        }
    }, [count, speed, color]);
    return _jsx(CanvasShell, Object.assign({ draw: draw, height: height }, rest));
};
export default Starfield;
