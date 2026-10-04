'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './BarProgress.module.css';
import * as React from 'react';
const BarProgress = ({ intervalRate, progress, fillChar = '█' }) => {
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
    const total = 20;
    const filled = Math.round((displayValue / 100) * total);
    return (_jsxs("span", { className: styles.bar, children: [_jsx("span", { className: styles.filled, children: fillChar.repeat(filled) }), _jsx("span", { className: styles.empty, children: fillChar.repeat(total - filled) }), _jsxs("span", { className: styles.label, children: [displayValue, "%"] })] }));
};
export default BarProgress;
