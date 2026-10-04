import * as React from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: 'PRIMARY' | 'SECONDARY';
    isDisabled?: boolean;
    children?: React.ReactNode;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
