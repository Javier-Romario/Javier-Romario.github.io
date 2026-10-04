import * as React from 'react';
interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children?: React.ReactNode;
}
declare const Text: React.FC<TextProps>;
export default Text;
