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
import styles from './TickerBoard.module.css';
import Ticker from './Ticker.js';
const TickerBoard = (_a) => {
    var { message, messageTone = 'teal', tickerItems = [], tickerLabel, tickerTone = 'teal', tickerDirection = 'left', tickerSpeed, showTopTicker = true, showBottomTicker = false, theme, children, style } = _a, rest = __rest(_a, ["message", "messageTone", "tickerItems", "tickerLabel", "tickerTone", "tickerDirection", "tickerSpeed", "showTopTicker", "showBottomTicker", "theme", "children", "style"]);
    const hasTicker = tickerItems.length > 0 || Boolean(tickerLabel);
    return (_jsxs("div", Object.assign({ className: styles.root }, rest, { "data-theme": theme, style: style, children: [message ? (_jsxs("div", { className: styles.message, "data-tone": messageTone, children: [_jsx("span", { className: styles.messageGlyph, "aria-hidden": "true", children: "\u25A0" }), _jsx("span", { className: styles.messageText, children: message })] })) : null, _jsxs("div", { className: styles.body, children: [showTopTicker && hasTicker ? (_jsx("div", { className: styles.topTicker, children: _jsx(Ticker, { items: tickerItems, label: tickerLabel, tone: tickerTone, direction: tickerDirection, speed: tickerSpeed }) })) : null, _jsx("div", { className: styles.content, children: children }), showBottomTicker && hasTicker ? (_jsx("div", { className: styles.bottomTicker, children: _jsx(Ticker, { items: tickerItems, label: tickerLabel, tone: tickerTone, direction: tickerDirection === 'left' ? 'right' : 'left', speed: tickerSpeed }) })) : null] })] })));
};
export default TickerBoard;
