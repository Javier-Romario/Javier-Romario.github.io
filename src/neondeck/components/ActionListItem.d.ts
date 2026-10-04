import * as React from 'react';
interface ActionListItemProps {
    style?: React.CSSProperties;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    href?: string;
    target?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement | HTMLAnchorElement>;
    role?: string;
}
declare const ActionListItem: React.FC<ActionListItemProps>;
export default ActionListItem;
