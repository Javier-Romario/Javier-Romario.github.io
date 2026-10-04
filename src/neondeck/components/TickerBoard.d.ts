import * as React from 'react';
import { NeonTone } from './Ticker';
interface TickerBoardProps extends React.HTMLAttributes<HTMLDivElement> {
    message?: string;
    messageTone?: NeonTone;
    tickerItems?: string[];
    tickerLabel?: string;
    tickerTone?: NeonTone;
    tickerDirection?: 'left' | 'right';
    tickerSpeed?: number;
    showTopTicker?: boolean;
    showBottomTicker?: boolean;
    theme?: 'dark' | 'light';
    children?: React.ReactNode;
}
declare const TickerBoard: React.FC<TickerBoardProps>;
export default TickerBoard;
