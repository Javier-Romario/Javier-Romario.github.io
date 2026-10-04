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
import styles from './Hologram.module.css';
import * as React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { CANVAS_THEME, useThemeColors } from '../common/theme.js';
function NeonShape({ shape, color, accent, hovered, setHovered, }) {
    const ref = React.useRef(null);
    useFrame((state, delta) => {
        const m = ref.current;
        if (!m)
            return;
        m.rotation.y += delta * 0.5;
        m.rotation.x += delta * 0.15;
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.06;
        m.scale.setScalar(pulse);
    });
    const geometry = (() => {
        switch (shape) {
            case 'sphere':
                return _jsx("sphereGeometry", { args: [1.4, 48, 48] });
            case 'torus':
                return _jsx("torusGeometry", { args: [1.2, 0.42, 24, 64] });
            case 'knot':
                return _jsx("torusKnotGeometry", { args: [1, 0.32, 120, 16] });
            case 'icosahedron':
                return _jsx("icosahedronGeometry", { args: [1.5, 0] });
            case 'diamond':
            default:
                return _jsx("octahedronGeometry", { args: [1.5, 0] });
        }
    })();
    const c = hovered ? accent : color;
    return (_jsxs("mesh", { ref: ref, onPointerOver: () => setHovered(true), onPointerOut: () => setHovered(false), children: [geometry, _jsx("meshStandardMaterial", { color: c, emissive: c, emissiveIntensity: hovered ? 0.95 : 0.4, metalness: 0.6, roughness: 0.2, wireframe: shape === 'icosahedron' })] }));
}
function HaloRing({ accent }) {
    const ref = React.useRef(null);
    useFrame((_, delta) => {
        if (ref.current)
            ref.current.rotation.z += delta * 0.4;
    });
    const dots = Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2;
        return { x: Math.cos(a) * 2.7, y: Math.sin(a) * 2.7 };
    });
    return (_jsx("group", { ref: ref, children: dots.map((p, i) => (_jsxs("mesh", { position: [p.x, p.y, 0], children: [_jsx("sphereGeometry", { args: [0.06, 12, 12] }), _jsx("meshBasicMaterial", { color: accent })] }, i))) }));
}
const Hologram = (_a) => {
    var { shape = 'diamond', color: colorProp, accent: accentProp, height = 360, interactive = true, autoRotate = true, style } = _a, rest = __rest(_a, ["shape", "color", "accent", "height", "interactive", "autoRotate", "style"]);
    const [hovered, setHovered] = React.useState(false);
    const rootRef = React.useRef(null);
    const { colors } = useThemeColors(rootRef, CANVAS_THEME);
    const color = colorProp !== null && colorProp !== void 0 ? colorProp : colors.fg;
    const accent = accentProp !== null && accentProp !== void 0 ? accentProp : colors.accent;
    return (_jsxs("div", Object.assign({ ref: rootRef, className: styles.root, style: Object.assign({ height }, style) }, rest, { children: [_jsxs(Canvas, { camera: { position: [0, 0, 6], fov: 45 }, dpr: [1, 2], children: [_jsx("ambientLight", { intensity: 0.4 }), _jsx("pointLight", { position: [6, 6, 6], intensity: 40, color: color }), _jsx(NeonShape, { shape: shape, color: color, accent: accent, hovered: hovered, setHovered: setHovered }), _jsx(HaloRing, { accent: accent }), _jsx(Stars, { radius: 60, depth: 40, count: 1200, factor: 3, fade: true, speed: 1 }), interactive ? (_jsx(OrbitControls, { autoRotate: autoRotate, enableZoom: false, enablePan: false, autoRotateSpeed: 0.6 })) : null] }), _jsxs("div", { className: styles.readout, children: [shape.toUpperCase(), " \u00B7 ", hovered ? 'HOVER' : 'DRAG TO ORBIT'] })] })));
};
export default Hologram;
