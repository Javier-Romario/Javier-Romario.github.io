'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import styles from './ActionBar.module.css';
import ActionButton from './ActionButton.js';
const ActionBar = ({ items }) => {
    return (_jsx("div", { className: styles.bar, children: items.map((item, index) => (_jsx(ActionButton, { hotkey: item.hotkey, onClick: item.onClick, isSelected: item.selected, children: item.body }, index))) }));
};
export default ActionBar;
