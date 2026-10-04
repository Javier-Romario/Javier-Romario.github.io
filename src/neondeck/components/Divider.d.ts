import * as React from 'react';
interface DividerProps extends React.HTMLAttributes<HTMLSpanElement> {
    children?: React.ReactNode;
    type?: string | any;
    style?: any;
}
declare const Divider: React.FC<DividerProps>;
export default Divider;
