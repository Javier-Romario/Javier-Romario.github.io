import * as React from 'react';
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    caretChars?: string | any;
    label?: string | any;
    isBlink?: boolean;
};
declare const Input: React.FC<InputProps>;
export default Input;
