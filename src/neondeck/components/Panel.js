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
import styles from './Panel.module.css';
import { shapePaths, PANEL_SHAPES } from '../common/shape.js';
import PanelTrail from './PanelTrail.js';
const Panel = (_a) => {
    var { shape = 'chamfer', tone = 'teal', border = 1.5, flat = false, clipContent = true, before, after, children, className, style } = _a, rest = __rest(_a, ["shape", "tone", "border", "flat", "clipContent", "before", "after", "children", "className", "style"]);
    const cuts = typeof shape === 'string' ? PANEL_SHAPES[shape] : shape;
    const paths = shapePaths(cuts, border);
    const vars = Object.assign({ '--panel-outer': paths.outer, '--panel-inner': paths.inner, '--panel-ring': paths.ring, '--panel-halo': paths.halo, '--panel-border': `${border}px` }, style);
    const panel = (_jsxs("div", Object.assign({ className: [styles.panel, className].filter(Boolean).join(' '), "data-tone": tone, "data-flat": flat || undefined, style: vars }, rest, { children: [_jsx("span", { className: styles.halo, "aria-hidden": "true", children: _jsx("span", { className: styles.silhouette }) }), _jsx("span", { className: styles.ring, "aria-hidden": "true" }), _jsx("span", { className: styles.glass, "aria-hidden": "true" }), _jsx("div", { className: styles.content, "data-clip": clipContent || undefined, children: children })] })));
    if (!before && !after)
        return panel;
    const trail = (side, t) => (_jsx(PanelTrail, Object.assign({ side: side, tone: tone }, (t === true ? {} : t))));
    return (_jsxs("div", { className: styles.rig, children: [before ? trail('before', before) : null, panel, after ? trail('after', after) : null] }));
};
export default Panel;
