'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './NeoToggle.module.css';
import * as React from 'react';
const NeoToggle = ({ label, tone = 'teal', checked, defaultChecked = false, onToggle, }) => {
    const [on, setOn] = React.useState(checked !== null && checked !== void 0 ? checked : defaultChecked);
    React.useEffect(() => {
        if (checked !== undefined)
            setOn(checked);
    }, [checked]);
    const toggle = () => {
        const next = !on;
        setOn(next);
        onToggle === null || onToggle === void 0 ? void 0 : onToggle(next);
    };
    return (_jsxs("button", { type: "button", className: styles.root, "data-tone": tone, "data-checked": on, role: "switch", "aria-checked": on, "aria-label": label, onClick: toggle, children: [_jsx("span", { className: styles.track, children: _jsx("span", { className: styles.knob }) }), label ? _jsx("span", { className: styles.label, children: label }) : null] }));
};
export default NeoToggle;
