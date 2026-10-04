'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './Select.module.css';
import * as React from 'react';
const Select = ({ name, options, placeholder = 'SELECT', defaultValue, onChange }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [value, setValue] = React.useState(defaultValue);
    const select = (option) => {
        setValue(option);
        setIsOpen(false);
        onChange === null || onChange === void 0 ? void 0 : onChange(option);
    };
    return (_jsxs("div", { className: styles.root, children: [_jsxs("button", { className: styles.trigger, onClick: () => setIsOpen(!isOpen), "aria-expanded": isOpen, type: "button", children: [_jsx("span", { className: styles.value, children: value || placeholder }), _jsx("span", { className: styles.glyph, "aria-hidden": "true", children: isOpen ? '▲' : '▼' })] }), isOpen ? (_jsx("div", { className: styles.menu, role: "listbox", children: options.map((option) => (_jsxs("button", { className: styles.option, onClick: () => select(option), role: "option", "aria-selected": value === option, type: "button", children: [value === option ? '◈' : '·', " ", option] }, option))) })) : null, _jsx("input", { type: "hidden", name: name, value: value || '' })] }));
};
export default Select;
