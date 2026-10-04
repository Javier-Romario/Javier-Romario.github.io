import * as React from 'react';
interface SpectrumProps extends React.HTMLAttributes<HTMLDivElement> {
    height?: number | string;
    color?: string;
    bars?: number;
    speed?: number;
    glow?: boolean;
}
declare const Spectrum: React.FC<SpectrumProps>;
export default Spectrum;
