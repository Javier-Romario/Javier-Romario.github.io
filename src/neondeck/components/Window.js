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
import styles from './Window.module.css';
const Window = (_a) => {
    var { children, style } = _a, rest = __rest(_a, ["children", "style"]);
    return (_jsxs("section", Object.assign({ className: styles.window, style: style }, rest, { children: [_jsx("div", { className: styles.scanlines, "aria-hidden": "true" }), children] })));
};
export default Window;
