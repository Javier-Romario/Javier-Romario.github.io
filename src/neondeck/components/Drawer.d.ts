import * as React from 'react';
interface DrawerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
    children?: React.ReactNode;
    defaultValue?: boolean;
}
declare const Drawer: React.FC<DrawerProps>;
export default Drawer;
