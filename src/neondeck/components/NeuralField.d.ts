import * as React from 'react';
interface NeuralFieldProps extends React.HTMLAttributes<HTMLDivElement> {
    height?: number | string;
    color?: string;
    nodeCount?: number;
    linkDistance?: number;
    nodeRadius?: number;
    speed?: number;
    interactive?: boolean;
}
declare const NeuralField: React.FC<NeuralFieldProps>;
export default NeuralField;
