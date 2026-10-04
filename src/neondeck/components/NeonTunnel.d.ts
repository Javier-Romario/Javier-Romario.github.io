import * as React from 'react';
interface NeonTunnelProps extends React.HTMLAttributes<HTMLDivElement> {
    height?: number | string;
    color?: string;
    accent?: string;
    speed?: number;
    rings?: number;
}
declare const NeonTunnel: React.FC<NeonTunnelProps>;
export default NeonTunnel;
