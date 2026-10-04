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
import styles from './Drawer.module.css';
import * as React from 'react';
const Drawer = (_a) => {
    var { children, defaultValue = false } = _a, rest = __rest(_a, ["children", "defaultValue"]);
    const [isOpen, setIsOpen] = React.useState(defaultValue);
    return (_jsxs("div", Object.assign({ className: styles.drawer }, rest, { children: [_jsxs("button", { className: styles.toggle, onClick: () => setIsOpen(!isOpen), "aria-expanded": isOpen, children: [_jsx("span", { className: styles.glyph, "aria-hidden": "true", children: isOpen ? '◂' : '▸' }), _jsx("span", { className: styles.label, children: isOpen ? 'CLOSE' : 'OPEN' })] }), isOpen ? _jsx("div", { className: styles.body, children: children }) : null] })));
};
export default Drawer;
