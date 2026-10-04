import * as React from 'react';
import type { NeonTone } from './Ticker';
interface NeoCodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
    children?: React.ReactNode;
    tone?: NeonTone;
}
declare const NeoCodeBlock: React.FC<NeoCodeBlockProps>;
export default NeoCodeBlock;
