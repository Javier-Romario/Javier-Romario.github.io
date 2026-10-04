'use client';
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
import styles from './NeoTicker.module.css';
const NeoTicker = (_a) => {
    var { items = [], label, tone = 'teal', direction = 'left', speed = 24, style } = _a, rest = __rest(_a, ["items", "label", "tone", "direction", "speed", "style"]);
    const feed = items.length ? items : [label || 'NEONDECK'];
    const duration = { ['--ticker-speed']: `${speed}s` };
    const renderRun = (key) => (_jsx("div", { className: styles.run, "aria-hidden": key === 'run-b' ? 'true' : undefined, children: feed.map((item, index) => (_jsxs("span", { className: styles.entry, children: [_jsx("span", { className: styles.sep, "aria-hidden": "true", children: "\u25C8" }), _jsx("span", { className: styles.item, children: item })] }, `${key}-${index}`))) }, key));
    return (_jsxs("div", Object.assign({ className: styles.root, "data-tone": tone, style: Object.assign(Object.assign({}, duration), style) }, rest, { children: [label ? _jsx("span", { className: styles.label, children: label }) : null, _jsx("div", { className: styles.viewport, children: _jsxs("div", { className: styles.track, "data-direction": direction, children: [renderRun('run-a'), renderRun('run-b')] }) })] })));
};
export default NeoTicker;
