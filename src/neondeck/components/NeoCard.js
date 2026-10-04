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
import Panel from './Panel.js';
import Ticker from './Ticker.js';
import styles from './NeoCard.module.css';
const NeoCard = (_a) => {
    var { title, tone = 'teal', shape = 'slab', ticker = false, tickerItems = [], tickerLabel, tickerSpeed, children, style } = _a, rest = __rest(_a, ["title", "tone", "shape", "ticker", "tickerItems", "tickerLabel", "tickerSpeed", "children", "style"]);
    const hasTicker = ticker && (tickerItems.length > 0 || Boolean(tickerLabel));
    return (_jsxs(Panel, Object.assign({ shape: shape, tone: tone, style: Object.assign({ '--panel-pad': '0' }, style) }, rest, { children: [hasTicker ? (_jsx("div", { className: styles.ticker, children: _jsx(Ticker, { items: tickerItems, label: tickerLabel, tone: tone, speed: tickerSpeed }) })) : null, title ? _jsx("header", { className: styles.title, children: title }) : null, _jsx("section", { className: styles.body, children: children })] })));
};
export default NeoCard;
