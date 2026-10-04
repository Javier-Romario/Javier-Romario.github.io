import * as React from 'react';
import type { NeonTone } from './Ticker';
interface NeoToggleProps {
    label?: string;
    tone?: NeonTone;
    checked?: boolean;
    defaultChecked?: boolean;
    onToggle?: (next: boolean) => void;
}
declare const NeoToggle: React.FC<NeoToggleProps>;
export default NeoToggle;
