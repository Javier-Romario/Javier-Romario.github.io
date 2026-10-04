import * as React from 'react';
interface ActionButtonProps {
    onClick?: () => void;
    hotkey?: any;
    children?: React.ReactNode;
    style?: any;
    rootStyle?: any;
    isSelected?: boolean;
}
declare const ActionButton: React.FC<ActionButtonProps>;
export default ActionButton;
