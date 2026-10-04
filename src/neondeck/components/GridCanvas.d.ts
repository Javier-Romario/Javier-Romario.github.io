import * as React from 'react';
interface GridCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
    height?: number | string;
    speed?: number;
    color?: string;
    horizon?: number;
    sunColor?: string;
}
declare const GridCanvas: React.FC<GridCanvasProps>;
export default GridCanvas;
