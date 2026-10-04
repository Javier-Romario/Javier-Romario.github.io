import * as React from 'react';
import type { NeonTone } from './Ticker';
interface NeoBarLoaderProps {
    intervalRate?: number;
    progress?: number;
    tone?: NeonTone;
}
declare const NeoBarLoader: React.FC<NeoBarLoaderProps>;
export default NeoBarLoader;
