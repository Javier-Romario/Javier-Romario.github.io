'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './ButtonGroup.module.css';
import * as React from 'react';
import * as Utilities from '../common/utilities.js';
const ButtonGroup = ({ items, isFull }) => {
    const [selected, setSelected] = React.useState(() => items.findIndex((i) => i.selected));
    return (_jsx("div", { className: Utilities.classNames(styles.group, isFull ? styles.full : null), children: items.map((item, index) => (_jsxs("button", { className: Utilities.classNames(styles.item, selected === index ? styles.selected : null), onClick: () => {
                var _a;
                setSelected(index);
                (_a = item.onClick) === null || _a === void 0 ? void 0 : _a.call(item);
            }, children: [item.hotkey ? _jsx("span", { className: styles.hotkey, children: item.hotkey }) : null, item.body] }, index))) }));
};
export default ButtonGroup;
