import * as React from 'react';
interface AccordionProps {
    defaultValue?: boolean;
    title: string;
    children?: React.ReactNode;
}
declare const Accordion: React.FC<AccordionProps>;
export default Accordion;
