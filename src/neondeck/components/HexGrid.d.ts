import * as React from 'react';
interface HexGridProps extends React.HTMLAttributes<HTMLDivElement> {
    height?: number | string;
    color?: string;
    size?: number;
    pulseRate?: number;
    glow?: boolean;
}
declare const HexGrid: React.FC<HexGridProps>;
export default HexGrid;
