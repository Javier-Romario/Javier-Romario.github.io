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
import styles from './Card.module.css';
import Panel from './Panel.js';
const Card = (_a) => {
    var { children, mode, title, shape = 'slab', style } = _a, rest = __rest(_a, ["children", "mode", "title", "shape", "style"]);
    return (_jsxs(Panel, Object.assign({ shape: shape, style: Object.assign({ '--panel-pad': '0' }, style) }, rest, { children: [_jsx("header", { className: styles.action, children: title ? _jsx("h2", { className: styles.title, children: title }) : null }), _jsx("section", { className: styles.children, children: children })] })));
};
export default Card;
