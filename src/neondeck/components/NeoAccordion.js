'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './NeoAccordion.module.css';
import * as React from 'react';
const NeoAccordion = ({ defaultValue = false, title, children, tone = 'teal', }) => {
    const [isExpanded, setIsExpanded] = React.useState(defaultValue);
    return (_jsxs("div", { className: styles.accordion, "data-tone": tone, "data-expanded": isExpanded ? 'true' : 'false', children: [_jsxs("button", { className: styles.header, onClick: () => setIsExpanded(!isExpanded), "aria-expanded": isExpanded, children: [_jsx("span", { className: styles.glyph, "aria-hidden": "true", children: isExpanded ? '▾' : '▸' }), _jsx("span", { className: styles.title, children: title }), _jsx("span", { className: styles.state, "aria-hidden": "true", children: isExpanded ? 'OPEN' : 'CLOSED' })] }), isExpanded ? _jsx("div", { className: styles.body, children: children }) : null] }));
};
export default NeoAccordion;
