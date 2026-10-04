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
import styles from './NeoButton.module.css';
import * as Utilities from '../common/utilities.js';
const NeoButton = (_a) => {
    var { variant = 'raised', tone = 'teal', children } = _a, rest = __rest(_a, ["variant", "tone", "children"]);
    return (_jsx("button", Object.assign({ type: "button", className: Utilities.classNames(styles.root, styles[variant]), "data-tone": tone }, rest, { children: children })));
};
export default NeoButton;
