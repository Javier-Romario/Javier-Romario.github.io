import * as React from 'react';
import type { Cuts, PanelShape } from '../common/shape';
import type { NeonTone } from './Ticker';
import type { TrailProps } from './PanelTrail';
export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Named preset, or a custom `Cuts` spec (corner chamfers + edge notches). */
    shape?: PanelShape | Cuts;
    tone?: NeonTone;
    /** Edge ring width in px. */
    border?: number;
    /** Turn the neon halo + neumorphic drop shadow off. */
    flat?: boolean;
    /** Clip children to the inset shape so nothing pokes out of a cut. Default true. */
    clipContent?: boolean;
    /** Lead line + ticker cap trailing off the left edge. */
    before?: TrailProps | true;
    /** Lead line + ticker cap trailing off the right edge. */
    after?: TrailProps | true;
    children?: React.ReactNode;
}
declare const Panel: React.FC<PanelProps>;
export default Panel;
