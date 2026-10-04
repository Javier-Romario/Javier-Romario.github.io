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
import styles from './CodeBlock.module.css';
const CodeBlock = (_a) => {
    var { children } = _a, rest = __rest(_a, ["children"]);
    const lines = typeof children === 'string' ? children.split('\n') : null;
    return (_jsx("pre", Object.assign({ className: styles.pre }, rest, { children: lines
            ? lines.map((line, index) => (_jsxs("span", { className: styles.line, children: [_jsx("span", { className: styles.number, "aria-hidden": "true", children: String(index + 1).padStart(2, '0') }), _jsx("span", { className: styles.code, children: line || ' ' })] }, index)))
            : children })));
};
export default CodeBlock;
