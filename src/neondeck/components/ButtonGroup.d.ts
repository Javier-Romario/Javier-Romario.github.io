import * as React from 'react';
interface ButtonGroupItem {
    body: string;
    hotkey?: string;
    selected?: boolean;
    onClick?: () => void;
}
interface ButtonGroupProps {
    items: ButtonGroupItem[];
    isFull?: boolean;
}
declare const ButtonGroup: React.FC<ButtonGroupProps>;
export default ButtonGroup;
