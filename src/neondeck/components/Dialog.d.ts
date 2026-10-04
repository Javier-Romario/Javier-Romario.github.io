import * as React from 'react';
interface DialogProps {
    title?: React.ReactNode;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    onConfirm?: () => void;
    onCancel?: () => void;
}
declare const Dialog: React.FC<DialogProps>;
export default Dialog;
