import * as React from 'react';
import type { Cuts, PanelShape } from '../common/shape';
export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    children?: React.ReactNode;
    title?: React.ReactNode;
    mode?: string;
    /** Chamfer/notch preset or custom cuts. Default `'slab'`. */
    shape?: PanelShape | Cuts;
}
declare const Card: React.FC<CardProps>;
export default Card;
