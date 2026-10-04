import * as React from 'react';
interface AvatarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'className' | 'children'> {
    src?: string;
    href?: string;
    target?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}
declare const Avatar: React.FC<AvatarProps>;
export default Avatar;
