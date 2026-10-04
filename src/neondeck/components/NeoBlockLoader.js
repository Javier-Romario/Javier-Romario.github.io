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
import styles from './NeoBlockLoader.module.css';
import * as React from 'react';
const FRAMES = {
    0: ['▖', '▘', '▝', '▗'],
    1: ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'],
    2: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
    3: ['┤', '┘', '┴', '└', '├', '┌', '┬', '┐'],
    4: ['◐', '◓', '◑', '◒'],
    5: ['▞', '▚'],
    6: ['◢', '◣', '◤', '◥'],
    7: ['⌜', '⌝', '⌟', '⌞'],
    8: ['■', '□', '▪', '▫'],
    9: ['|', '/', '-', '\\'],
    10: ['▉', '▊', '▋', '▌', '▍', '▎', '▏'],
    11: ['▓', '▒', '░'],
};
const NeoBlockLoader = (_a) => {
    var { mode = 0, tone = 'teal' } = _a, rest = __rest(_a, ["mode", "tone"]);
    const frames = FRAMES[mode] || FRAMES[0];
    const [index, setIndex] = React.useState(0);
    React.useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % frames.length);
        }, 120);
        return () => clearInterval(timer);
    }, [frames.length]);
    return (_jsx("span", Object.assign({ className: styles.orb, "data-tone": tone }, rest, { children: frames[index] })));
};
export default NeoBlockLoader;
