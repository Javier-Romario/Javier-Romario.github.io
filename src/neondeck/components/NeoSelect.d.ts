import * as React from 'react';
import type { NeonTone } from './Ticker';
interface NeoSelectProps {
    name: string;
    options: string[];
    placeholder?: string;
    defaultValue?: string;
    onChange?: (selectedValue: string) => void;
    tone?: NeonTone;
}
declare const NeoSelect: React.FC<NeoSelectProps>;
export default NeoSelect;
