'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './NeoBarLoader.module.css';
import * as React from 'react';
const NeoBarLoader = ({ intervalRate, progress, tone = 'teal' }) => {
    const [value, setValue] = React.useState(progress !== null && progress !== void 0 ? progress : 0);
    React.useEffect(() => {
        if (intervalRate === undefined)
            return;
        const timer = setInterval(() => {
            setValue((prev) => (prev >= 100 ? 0 : prev + 1));
        }, intervalRate);
        return () => clearInterval(timer);
    }, [intervalRate]);
    const displayValue = progress !== undefined ? progress : value;
    return (_jsxs("div", { className: styles.track, "data-tone": tone, children: [_jsx("div", { className: styles.fill, style: { width: `${displayValue}%` } }), _jsxs("span", { className: styles.label, children: [displayValue, "%"] })] }));
};
export default NeoBarLoader;
