import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './Breadcrumbs.module.css';
const Breadcrumbs = ({ items }) => {
    return (_jsx("nav", { className: styles.crumbs, "aria-label": "Breadcrumb", children: items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (_jsxs("span", { className: styles.crumb, children: [item.url ? (_jsx("a", { className: styles.link, href: item.url, children: item.name })) : (_jsx("span", { className: styles.current, children: item.name })), !isLast ? (_jsx("span", { className: styles.sep, "aria-hidden": "true", children: "/" })) : null] }, index));
        }) }));
};
export default Breadcrumbs;
