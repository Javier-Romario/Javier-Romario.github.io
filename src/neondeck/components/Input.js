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
import styles from './Input.module.css';
const Input = (_a) => {
    var { caretChars = '▮', label, isBlink = true, style } = _a, rest = __rest(_a, ["caretChars", "label", "isBlink", "style"]);
    return (_jsxs("div", { className: styles.root, style: style, children: [label ? _jsx("label", { className: styles.label, children: label }) : null, _jsxs("div", { className: styles.wrap, children: [_jsx("input", Object.assign({ className: styles.input }, rest)), _jsx("span", { className: styles.caret, "aria-hidden": "true", "data-blink": isBlink ? 'true' : 'false', children: caretChars })] })] }));
};
export default Input;
