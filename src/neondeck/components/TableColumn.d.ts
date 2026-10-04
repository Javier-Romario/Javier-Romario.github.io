import * as React from 'react';
type TableColumnProps = React.HTMLAttributes<HTMLTableCellElement> & {
    children?: React.ReactNode;
};
declare const TableColumn: React.FC<TableColumnProps>;
export default TableColumn;
