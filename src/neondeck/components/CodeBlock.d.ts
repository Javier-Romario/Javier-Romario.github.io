import * as React from 'react';
interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
    children?: React.ReactNode;
}
declare const CodeBlock: React.FC<CodeBlockProps>;
export default CodeBlock;
