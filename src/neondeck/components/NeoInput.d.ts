import * as React from 'react';
import type { NeonTone } from './Ticker';
type NeoInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    caretChars?: string;
    label?: string;
    isBlink?: boolean;
    tone?: NeonTone;
};
declare const NeoInput: React.FC<NeoInputProps>;
export default NeoInput;
