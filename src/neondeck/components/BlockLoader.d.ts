import * as React from 'react';
interface BlockLoaderProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
    mode?: number;
}
declare const BlockLoader: React.FC<BlockLoaderProps>;
export default BlockLoader;
