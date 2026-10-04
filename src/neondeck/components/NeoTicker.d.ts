import * as React from 'react';
import type { NeonTone } from './Ticker';
interface NeoTickerProps extends React.HTMLAttributes<HTMLDivElement> {
    items?: string[];
    label?: string;
    tone?: NeonTone;
    direction?: 'left' | 'right';
    speed?: number;
}
declare const NeoTicker: React.FC<NeoTickerProps>;
export default NeoTicker;
