import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CheckBox from '@mui/material/Checkbox';
import { withStore } from 'state-range';
import { DataTableProps, ColumnProps } from '../../types';

const TableColumns = ({ handler, rowActions: RowActions }: DataTableProps) => {
    const columns = handler.getMeta('columns');

    if (!columns || !columns.length) {
        return <></>;
    }

    const checkbox = handler.getMeta('checkbox');
    const allrowsLength = handler.count();
    const checkedRowsLength = handler.count({ checked: true });
    const isAllChecked = allrowsLength === checkedRowsLength ? true : false;
    const indeterminate = !isAllChecked && checkedRowsLength ? true : false;

    return (
        <TableHead>
            <TableRow>
                {checkbox && (
                    <TableCell padding="checkbox">
                        <CheckBox
                            indeterminate={indeterminate}
                            checked={isAllChecked}
                            onChange={() => {
                                if (indeterminate) {
                                    handler.update({ checked: false }, { checked: true });
                                } else if (isAllChecked) {
                                    handler.update({ checked: false }, { checked: true });
                                } else {
                                    handler.update({ checked: true }, { checked: false });
                                }
                            }}
                        />
                    </TableCell>
                )}
                {columns?.map(({ title, field, ...rest }: ColumnProps) => {
                    return (
                        <TableCell key={field} {...rest}>
                            {title}
                        </TableCell>
                    );
                })}
                {RowActions && <TableCell width={20}></TableCell>}
            </TableRow>
        </TableHead>
    );
};

export default withStore(TableColumns, ({ handler }: DataTableProps) => {
    return [handler.observeMeta('columns'), handler.count({ checked: true })];
});
