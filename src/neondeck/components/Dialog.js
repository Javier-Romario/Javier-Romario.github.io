'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './Dialog.module.css';
import Button from './Button.js';
const Dialog = ({ title, children, style, onConfirm, onCancel }) => {
    return (_jsx("div", { className: styles.backdrop, children: _jsxs("div", { className: styles.dialog, style: style, children: [title ? _jsx("header", { className: styles.header, children: title }) : null, _jsx("div", { className: styles.body, children: children }), _jsxs("footer", { className: styles.footer, children: [_jsx(Button, { theme: "SECONDARY", onClick: onCancel, children: "Cancel" }), _jsx(Button, { onClick: onConfirm, children: "OK" })] })] }) }));
};
export default Dialog;
