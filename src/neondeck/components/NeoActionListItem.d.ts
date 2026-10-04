import * as React from 'react';
import type { NeonTone } from './Ticker';
interface NeoActionListItemProps {
    style?: React.CSSProperties;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    href?: string;
    target?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement | HTMLAnchorElement>;
    role?: string;
    tone?: NeonTone;
}
declare const NeoActionListItem: React.FC<NeoActionListItemProps>;
export default NeoActionListItem;
