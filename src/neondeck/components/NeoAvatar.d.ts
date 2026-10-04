import * as React from 'react';
import type { NeonTone } from './Ticker';
interface NeoAvatarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'className' | 'children'> {
    src?: string;
    href?: string;
    target?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    tone?: NeonTone;
}
declare const NeoAvatar: React.FC<NeoAvatarProps>;
export default NeoAvatar;
