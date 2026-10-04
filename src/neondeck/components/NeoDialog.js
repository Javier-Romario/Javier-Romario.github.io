'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './NeoDialog.module.css';
import NeoButton from './NeoButton.js';
const NeoDialog = ({ title, children, style, onConfirm, onCancel, tone = 'teal' }) => {
    return (_jsx("div", { className: styles.backdrop, "data-tone": tone, children: _jsxs("div", { className: styles.dialog, style: style, children: [title ? _jsx("header", { className: styles.header, children: title }) : null, _jsx("div", { className: styles.body, children: children }), _jsxs("footer", { className: styles.footer, children: [_jsx(NeoButton, { tone: tone, variant: "glass", onClick: onCancel, children: "Cancel" }), _jsx(NeoButton, { tone: tone, onClick: onConfirm, children: "OK" })] })] }) }));
};
export default NeoDialog;
