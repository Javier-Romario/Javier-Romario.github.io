import * as React from 'react';
interface CRTOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
    height?: number | string;
    scanlines?: number;
    flicker?: number;
    vignette?: number;
    noise?: number;
    roll?: boolean;
    children?: React.ReactNode;
}
declare const CRTOverlay: React.FC<CRTOverlayProps>;
export default CRTOverlay;
