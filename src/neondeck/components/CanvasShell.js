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
import styles from './CanvasShell.module.css';
import { useCanvas } from '../common/useCanvas.js';
const CanvasShell = (_a) => {
    var { draw, fps, height = 240, style, children } = _a, rest = __rest(_a, ["draw", "fps", "height", "style", "children"]);
    const canvasRef = useCanvas(draw, fps);
    return (_jsxs("div", Object.assign({ className: styles.root, style: Object.assign({ height }, style) }, rest, { children: [_jsx("canvas", { ref: canvasRef, className: styles.canvas }), children] })));
};
export default CanvasShell;
