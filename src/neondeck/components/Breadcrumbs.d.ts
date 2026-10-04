import * as React from 'react';
interface BreadcrumbsItem {
    name: string;
    url?: string;
}
interface BreadcrumbsProps {
    items: BreadcrumbsItem[];
}
declare const Breadcrumbs: React.FC<BreadcrumbsProps>;
export default Breadcrumbs;
