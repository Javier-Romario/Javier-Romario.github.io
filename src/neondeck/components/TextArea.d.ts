import * as React from 'react';
type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    autoPlay?: string;
    autoPlaySpeedMS?: number;
    isBlink?: boolean;
};
declare const TextArea: React.FC<TextAreaProps>;
export default TextArea;
