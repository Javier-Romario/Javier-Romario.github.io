import * as React from 'react';
interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
    logoHref?: string;
    logoTarget?: React.HTMLAttributeAnchorTarget;
    onClickLogo?: React.MouseEventHandler<HTMLButtonElement>;
    logo?: React.ReactNode;
    left?: React.ReactNode;
    right?: React.ReactNode;
}
declare const Navigation: React.FC<NavigationProps>;
export default Navigation;
