import * as React from 'react';
import type { NeonTone } from './Ticker';
interface NeoBreadcrumbsItem {
    name: string;
    url?: string;
}
interface NeoBreadcrumbsProps {
    items: NeoBreadcrumbsItem[];
    tone?: NeonTone;
}
declare const NeoBreadcrumbs: React.FC<NeoBreadcrumbsProps>;
export default NeoBreadcrumbs;
