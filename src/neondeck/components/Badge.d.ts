import * as React from 'react';
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    children?: React.ReactNode;
}
declare const Badge: React.FC<BadgeProps>;
export default Badge;
