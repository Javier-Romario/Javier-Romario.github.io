import * as React from 'react';
import type { NeonTone } from './Ticker';
interface NeoAlertBannerProps {
    style?: React.CSSProperties;
    children?: React.ReactNode;
    tone?: NeonTone;
}
declare const NeoAlertBanner: React.FC<NeoAlertBannerProps>;
export default NeoAlertBanner;
