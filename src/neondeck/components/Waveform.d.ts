import * as React from 'react';
interface WaveformProps extends React.HTMLAttributes<HTMLDivElement> {
    height?: number | string;
    color?: string;
    speed?: number;
    amplitude?: number;
    layers?: number;
    glitch?: number;
}
declare const Waveform: React.FC<WaveformProps>;
export default Waveform;
