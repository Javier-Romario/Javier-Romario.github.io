import * as React from 'react';
interface SelectProps {
    name: string;
    options: string[];
    placeholder?: string;
    defaultValue?: string;
    onChange?: (selectedValue: string) => void;
}
declare const Select: React.FC<SelectProps>;
export default Select;
