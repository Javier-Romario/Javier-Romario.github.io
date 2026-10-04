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
import styles from './Button.module.css';
import * as Utilities from '../common/utilities.js';
const Button = (_a) => {
    var { theme = 'PRIMARY', isDisabled, children } = _a, rest = __rest(_a, ["theme", "isDisabled", "children"]);
    let classNames = Utilities.classNames(styles.root, styles.primary);
    if (theme === 'SECONDARY') {
        classNames = Utilities.classNames(styles.root, styles.secondary);
    }
    if (isDisabled) {
        classNames = Utilities.classNames(styles.root, styles.disabled);
        return (_jsx("div", { className: classNames, "aria-disabled": "true", children: children }));
    }
    return (_jsx("button", Object.assign({ className: classNames, role: "button", tabIndex: 0, disabled: isDisabled }, rest, { children: children })));
};
export default Button;
