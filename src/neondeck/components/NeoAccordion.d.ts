import * as React from 'react';
import type { NeonTone } from './Ticker';
interface NeoAccordionProps {
    defaultValue?: boolean;
    title: string;
    children?: React.ReactNode;
    tone?: NeonTone;
}
declare const NeoAccordion: React.FC<NeoAccordionProps>;
export default NeoAccordion;
