import * as React from 'react';
export type HologramShape = 'diamond' | 'sphere' | 'torus' | 'knot' | 'icosahedron';
interface HologramProps extends React.HTMLAttributes<HTMLDivElement> {
    shape?: HologramShape;
    color?: string;
    accent?: string;
    height?: number | string;
    interactive?: boolean;
    autoRotate?: boolean;
}
declare const Hologram: React.FC<HologramProps>;
export default Hologram;
