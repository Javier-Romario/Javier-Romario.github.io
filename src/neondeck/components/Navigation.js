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
import styles from './Navigation.module.css';
const Navigation = (_a) => {
    var { children, logoHref, logoTarget, onClickLogo, logo = '◆', left, right } = _a, rest = __rest(_a, ["children", "logoHref", "logoTarget", "onClickLogo", "logo", "left", "right"]);
    const logoElement = logoHref ? (_jsx("a", { className: styles.logo, href: logoHref, target: logoTarget, children: logo })) : (_jsx("button", { className: styles.logo, onClick: onClickLogo, children: logo }));
    return (_jsxs("nav", Object.assign({ className: styles.nav }, rest, { children: [_jsxs("div", { className: styles.left, children: [logoElement, left] }), _jsx("div", { className: styles.center, children: children }), _jsx("div", { className: styles.right, children: right })] })));
};
export default Navigation;
