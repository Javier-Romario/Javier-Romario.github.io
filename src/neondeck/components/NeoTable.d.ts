import * as React from 'react';
import type { NeonTone } from './Ticker';
type NeoTableProps = React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode;
    tone?: NeonTone;
};
declare const NeoTable: React.FC<NeoTableProps>;
export default NeoTable;
