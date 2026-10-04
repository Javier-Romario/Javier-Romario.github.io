import * as React from 'react';
import type { NeonTone } from './Ticker';
interface NeoBlockLoaderProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
    mode?: number;
    tone?: NeonTone;
}
declare const NeoBlockLoader: React.FC<NeoBlockLoaderProps>;
export default NeoBlockLoader;
