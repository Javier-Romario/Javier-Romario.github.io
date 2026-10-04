import * as React from 'react';
interface BarProgressProps {
    intervalRate?: number;
    progress?: number;
    fillChar?: string;
}
declare const BarProgress: React.FC<BarProgressProps>;
export default BarProgress;
