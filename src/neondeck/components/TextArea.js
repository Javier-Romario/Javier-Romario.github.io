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
import styles from './TextArea.module.css';
import * as React from 'react';
const TextArea = (_a) => {
    var { autoPlay, autoPlaySpeedMS = 40, isBlink = true } = _a, rest = __rest(_a, ["autoPlay", "autoPlaySpeedMS", "isBlink"]);
    const [value, setValue] = React.useState(() => (typeof rest.defaultValue === 'string' ? rest.defaultValue : ''));
    React.useEffect(() => {
        if (!autoPlay)
            return;
        let index = 0;
        const timer = setInterval(() => {
            index += 1;
            setValue(autoPlay.slice(0, index));
            if (index >= autoPlay.length)
                clearInterval(timer);
        }, autoPlaySpeedMS);
        return () => clearInterval(timer);
    }, [autoPlay, autoPlaySpeedMS]);
    return (_jsxs("div", { className: styles.wrap, children: [_jsx("textarea", Object.assign({ className: styles.textarea, value: value, onChange: (e) => setValue(e.target.value) }, rest)), _jsx("span", { className: styles.caret, "aria-hidden": "true", "data-blink": isBlink ? 'true' : 'false', children: "\u25AE" })] }));
};
export default TextArea;
