import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './ActionListItem.module.css';
const ActionListItem = ({ style, icon, children, href, target, onClick, role }) => {
    if (href) {
        return (_jsxs("a", { className: styles.item, href: href, target: target, style: style, role: role, children: [_jsx("span", { className: styles.icon, "aria-hidden": "true", children: icon }), _jsx("span", { className: styles.content, children: children })] }));
    }
    return (_jsxs("div", { className: styles.item, onClick: onClick, style: style, role: role, tabIndex: 0, children: [_jsx("span", { className: styles.icon, "aria-hidden": "true", children: icon }), _jsx("span", { className: styles.content, children: children })] }));
};
export default ActionListItem;
