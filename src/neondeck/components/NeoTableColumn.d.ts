import * as React from 'react';
type NeoTableColumnProps = React.HTMLAttributes<HTMLTableCellElement> & {
    children?: React.ReactNode;
};
declare const NeoTableColumn: React.FC<NeoTableColumnProps>;
export default NeoTableColumn;
