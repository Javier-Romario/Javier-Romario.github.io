import * as React from 'react';
import type { NeonTone } from './Ticker';
interface NeoNavigationProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
    logoHref?: string;
    logoTarget?: React.HTMLAttributeAnchorTarget;
    onClickLogo?: React.MouseEventHandler<HTMLButtonElement>;
    logo?: React.ReactNode;
    left?: React.ReactNode;
    right?: React.ReactNode;
    tone?: NeonTone;
}
declare const NeoNavigation: React.FC<NeoNavigationProps>;
export default NeoNavigation;
