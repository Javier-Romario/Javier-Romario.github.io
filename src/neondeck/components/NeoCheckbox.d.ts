import * as React from 'react';
import type { NeonTone } from './Ticker';
interface NeoCheckboxProps {
    style?: React.CSSProperties;
    checkboxStyle?: React.CSSProperties;
    name: string;
    defaultChecked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    tabIndex?: number;
    children?: React.ReactNode;
    tone?: NeonTone;
}
declare const NeoCheckbox: React.FC<NeoCheckboxProps>;
export default NeoCheckbox;
