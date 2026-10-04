import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './ActionButton.module.css';
import * as Utilities from '../common/utilities.js';
const ActionButton = ({ onClick, hotkey, children, style, rootStyle, isSelected }) => {
    return (_jsx("div", { className: styles.root, style: rootStyle, children: _jsxs("button", { className: Utilities.classNames(styles.button, isSelected ? styles.selected : null), onClick: onClick, style: style, children: [_jsx("span", { className: styles.hotkey, children: hotkey }), _jsx("span", { className: styles.label, children: children })] }) }));
};
export default ActionButton;
