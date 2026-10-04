import * as React from 'react';
interface RadarProps extends React.HTMLAttributes<HTMLDivElement> {
    height?: number | string;
    color?: string;
    sweepSpeed?: number;
    blipRate?: number;
    maxBlips?: number;
}
declare const Radar: React.FC<RadarProps>;
export default Radar;
