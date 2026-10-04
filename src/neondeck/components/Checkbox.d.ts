import * as React from 'react';
interface CheckboxProps {
    style?: React.CSSProperties;
    checkboxStyle?: React.CSSProperties;
    name: string;
    defaultChecked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    tabIndex?: number;
    children?: React.ReactNode;
}
declare const Checkbox: React.FC<CheckboxProps>;
export default Checkbox;
