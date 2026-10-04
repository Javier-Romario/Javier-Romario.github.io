import * as React from 'react';
import type { NeonTone } from './Ticker';
interface NeoBarProgressProps {
    intervalRate?: number;
    progress?: number;
    fillChar?: string;
    tone?: NeonTone;
}
declare const NeoBarProgress: React.FC<NeoBarProgressProps>;
export default NeoBarProgress;
