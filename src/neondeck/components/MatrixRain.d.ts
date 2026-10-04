import * as React from 'react';
interface MatrixRainProps extends React.HTMLAttributes<HTMLDivElement> {
    height?: number | string;
    color?: string;
    fontSize?: number;
    speed?: number;
    density?: number;
}
declare const MatrixRain: React.FC<MatrixRainProps>;
export default MatrixRain;
