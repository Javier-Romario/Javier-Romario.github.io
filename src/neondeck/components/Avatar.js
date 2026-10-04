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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './Avatar.module.css';
const Avatar = (_a) => {
    var { src, href, target, style, children } = _a, rest = __rest(_a, ["src", "href", "target", "style", "children"]);
    const portrait = src ? (_jsx("img", { className: styles.image, src: src, alt: "" })) : (_jsx("span", { className: styles.placeholder, children: "\u25C8" }));
    const inner = (_jsxs(_Fragment, { children: [_jsx("span", { className: styles.portrait, children: portrait }), children ? _jsx("span", { className: styles.label, children: children }) : null] }));
    if (href) {
        return (_jsx("div", Object.assign({ className: styles.root, style: style }, rest, { children: _jsx("a", { className: styles.link, href: href, target: target, children: inner }) })));
    }
    return (_jsx("div", Object.assign({ className: styles.root, style: style }, rest, { children: inner })));
};
export default Avatar;
