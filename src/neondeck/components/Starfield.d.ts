import * as React from 'react';
interface StarfieldProps extends React.HTMLAttributes<HTMLDivElement> {
    height?: number | string;
    color?: string;
    count?: number;
    speed?: number;
}
declare const Starfield: React.FC<StarfieldProps>;
export default Starfield;
