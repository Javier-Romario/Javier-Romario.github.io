import * as React from 'react';
import { type CanvasDrawFn } from '../common/useCanvas';
interface CanvasShellProps extends React.HTMLAttributes<HTMLDivElement> {
    draw: CanvasDrawFn;
    fps?: number;
    height?: number | string;
    children?: React.ReactNode;
}
declare const CanvasShell: React.FC<CanvasShellProps>;
export default CanvasShell;
