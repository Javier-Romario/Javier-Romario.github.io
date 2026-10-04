'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './Checkbox.module.css';
const Checkbox = ({ style, checkboxStyle, name, defaultChecked = false, onChange, tabIndex, children }) => {
    return (_jsxs("label", { className: styles.label, style: style, children: [_jsxs("span", { className: styles.box, style: checkboxStyle, children: [_jsx("input", { className: styles.input, type: "checkbox", name: name, defaultChecked: defaultChecked, onChange: onChange, tabIndex: tabIndex }), _jsx("span", { className: styles.glyph, "aria-hidden": "true", children: "\u25C8" })] }), _jsx("span", { className: styles.content, children: children })] }));
};
export default Checkbox;
