import * as React from 'react';
import type { NeonTone } from './Ticker';
interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'raised' | 'pressed' | 'glass';
    tone?: NeonTone;
    children?: React.ReactNode;
}
declare const NeoButton: React.FC<NeoButtonProps>;
export default NeoButton;
