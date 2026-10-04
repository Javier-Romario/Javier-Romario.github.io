import * as React from 'react';
import { NeonTone } from './Ticker';
import type { Cuts, PanelShape } from '../common/shape';
interface NeoCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    tone?: NeonTone;
    /** Chamfer/notch preset or custom cuts. Default `'slab'` (top-left + bottom-right chamfer). */
    shape?: PanelShape | Cuts;
    ticker?: boolean;
    tickerItems?: string[];
    tickerLabel?: string;
    tickerSpeed?: number;
    children?: React.ReactNode;
}
declare const NeoCard: React.FC<NeoCardProps>;
export default NeoCard;
