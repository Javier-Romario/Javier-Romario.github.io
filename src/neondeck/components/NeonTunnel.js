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
import styles from './NeonTunnel.module.css';
import * as React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { CANVAS_THEME, useThemeColors } from '../common/theme.js';
const DEPTH = 48;
function Tunnel({ rings, speed, color, accent }) {
    const group = React.useRef(null);
    const data = React.useMemo(() => Array.from({ length: rings }, (_, i) => ({
        z: -i * (DEPTH / rings),
        radius: 1.2 + (i % 4) * 0.55,
        useAccent: i % 3 === 1,
    })), [rings]);
    useFrame((_, delta) => {
        const g = group.current;
        if (!g)
            return;
        for (const child of g.children) {
            child.position.z += speed * delta;
            if (child.position.z > 5)
                child.position.z -= DEPTH;
        }
    });
    return (_jsx("group", { ref: group, children: data.map((d, i) => (_jsxs("mesh", { position: [0, 0, d.z], children: [_jsx("torusGeometry", { args: [d.radius, 0.025, 8, 72] }), _jsx("meshBasicMaterial", { color: d.useAccent ? accent : color })] }, i))) }));
}
const NeonTunnel = (_a) => {
    var { height = 360, color: colorProp, accent: accentProp, speed = 6, rings = 40, style } = _a, rest = __rest(_a, ["height", "color", "accent", "speed", "rings", "style"]);
    const rootRef = React.useRef(null);
    const { colors } = useThemeColors(rootRef, CANVAS_THEME);
    const color = colorProp !== null && colorProp !== void 0 ? colorProp : colors.fg;
    const accent = accentProp !== null && accentProp !== void 0 ? accentProp : colors.accent;
    return (_jsxs("div", Object.assign({ ref: rootRef, className: styles.root, style: Object.assign({ height }, style) }, rest, { children: [_jsxs(Canvas, { camera: { position: [0, 0, 5], fov: 70 }, dpr: [1, 2], children: [_jsx("color", { attach: "background", args: [colors.bg] }), _jsx(Tunnel, { rings: rings, speed: speed, color: color, accent: accent }), _jsx(Stars, { radius: 80, depth: 60, count: 2000, factor: 4, fade: true, speed: 2 })] }), _jsxs("div", { className: styles.readout, children: ["NEON TUNNEL \u00B7 ", Math.round(speed * 10), " KM/S"] })] })));
};
export default NeonTunnel;
