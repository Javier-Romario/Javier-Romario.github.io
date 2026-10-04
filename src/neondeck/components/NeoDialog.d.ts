import * as React from 'react';
import type { NeonTone } from './Ticker';
interface NeoDialogProps {
    title?: React.ReactNode;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    onConfirm?: () => void;
    onCancel?: () => void;
    tone?: NeonTone;
}
declare const NeoDialog: React.FC<NeoDialogProps>;
export default NeoDialog;
