import * as React from 'react';
import type { NeonTone } from './Ticker';
type NeoTextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    autoPlay?: string;
    autoPlaySpeedMS?: number;
    isBlink?: boolean;
    tone?: NeonTone;
};
declare const NeoTextArea: React.FC<NeoTextAreaProps>;
export default NeoTextArea;
