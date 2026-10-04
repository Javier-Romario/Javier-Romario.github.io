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
import styles from './CRTOverlay.module.css';
import * as React from 'react';
import { useCanvas } from '../common/useCanvas.js';
import { withAlpha } from '../common/theme.js';
const CRTOverlay = (_a) => {
    var { height = '100%', scanlines = 0.5, flicker = 0.05, vignette = 0.6, noise = 0.35, roll = true, style, children } = _a, rest = __rest(_a, ["height", "scanlines", "flicker", "vignette", "noise", "roll", "style", "children"]);
    const draw = React.useCallback((ctx, w, h, t, _frame, theme) => {
        ctx.clearRect(0, 0, w, h);
        // scanlines
        if (scanlines > 0) {
            ctx.fillStyle = withAlpha(theme.shade, scanlines * 0.5);
            for (let y = 0; y < h; y += 3)
                ctx.fillRect(0, y, w, 1);
        }
        // rolling brightness band
        if (roll) {
            const bandY = ((t * 45) % (h + 200)) - 100;
            const grad = ctx.createLinearGradient(0, bandY - 40, 0, bandY + 40);
            grad.addColorStop(0, withAlpha(theme.text, 0));
            grad.addColorStop(0.5, withAlpha(theme.text, 0.06));
            grad.addColorStop(1, withAlpha(theme.text, 0));
            ctx.fillStyle = grad;
            ctx.fillRect(0, bandY - 40, w, 80);
        }
        // noise
        if (noise > 0) {
            const n = Math.floor(w * h * noise * 0.002);
            for (let i = 0; i < n; i++) {
                ctx.fillStyle = Math.random() < 0.5 ? withAlpha(theme.text, 0.25) : withAlpha(theme.shade, 0.3);
                ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
            }
        }
        // vignette
        if (vignette > 0) {
            const vg = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.75);
            vg.addColorStop(0, withAlpha(theme.shade, 0));
            vg.addColorStop(1, withAlpha(theme.shade, vignette));
            ctx.fillStyle = vg;
            ctx.fillRect(0, 0, w, h);
        }
        // flicker
        if (flicker > 0 && Math.random() < flicker) {
            ctx.fillStyle = Math.random() < 0.5 ? withAlpha(theme.text, 0.04) : withAlpha(theme.shade, 0.08);
            ctx.fillRect(0, 0, w, h);
        }
    }, [scanlines, flicker, vignette, noise, roll]);
    const canvasRef = useCanvas(draw, 30);
    return (_jsxs("div", Object.assign({ className: styles.root, style: Object.assign({ height }, style) }, rest, { children: [children, _jsx("canvas", { ref: canvasRef, className: styles.overlay })] })));
};
export default CRTOverlay;
