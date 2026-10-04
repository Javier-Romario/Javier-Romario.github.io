import * as React from 'react';
export type NeonTone = 'teal' | 'magenta' | 'yellow' | 'green' | 'violet' | 'orange' | 'red' | 'blue';
interface TickerProps extends React.HTMLAttributes<HTMLDivElement> {
    items?: string[];
    label?: string;
    tone?: NeonTone;
    direction?: 'left' | 'right';
    speed?: number;
}
declare const Ticker: React.FC<TickerProps>;
export default Ticker;
