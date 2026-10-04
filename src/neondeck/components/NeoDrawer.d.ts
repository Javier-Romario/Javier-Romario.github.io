import * as React from 'react';
import type { NeonTone } from './Ticker';
interface NeoDrawerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
    children?: React.ReactNode;
    defaultValue?: boolean;
    tone?: NeonTone;
}
declare const NeoDrawer: React.FC<NeoDrawerProps>;
export default NeoDrawer;
