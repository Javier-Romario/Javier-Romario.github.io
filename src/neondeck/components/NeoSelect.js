'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './NeoSelect.module.css';
import * as React from 'react';
const NeoSelect = ({ name, options, placeholder = 'SELECT', defaultValue, onChange, tone = 'teal', }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [value, setValue] = React.useState(defaultValue);
    const select = (option) => {
        setValue(option);
        setIsOpen(false);
        onChange === null || onChange === void 0 ? void 0 : onChange(option);
    };
    return (_jsxs("div", { className: styles.root, "data-tone": tone, "data-open": isOpen ? 'true' : 'false', children: [_jsxs("button", { className: styles.trigger, onClick: () => setIsOpen(!isOpen), "aria-expanded": isOpen, type: "button", children: [_jsx("span", { className: styles.value, children: value || placeholder }), _jsx("span", { className: styles.glyph, "aria-hidden": "true", children: isOpen ? '▲' : '▼' })] }), isOpen ? (_jsx("div", { className: styles.menu, role: "listbox", children: options.map((option) => (_jsxs("button", { className: styles.option, onClick: () => select(option), role: "option", "aria-selected": value === option, type: "button", children: [value === option ? '◈' : '·', " ", option] }, option))) })) : null, _jsx("input", { type: "hidden", name: name, value: value || '' })] }));
};
export default NeoSelect;
