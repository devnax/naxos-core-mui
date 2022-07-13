import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CheckBox from '@mui/material/Checkbox';
import Handler from '../Handler';
import { withStore, withMemo } from 'state-range';
import { DataTableProps, ColumnProps } from '../types';

const _cols = ({ columns }: any) => {
    return columns.map(({ title, field, ...rest }: ColumnProps) => {
        return (
            <TableCell key={field} {...rest}>
                {title}
            </TableCell>
        );
    });
};

const Columns = withMemo(_cols, ({ id }: any) => {
    return [Handler.observeColumns(id)];
});

const TableColumns = ({ id, checkbox, rowActions: RowActions }: DataTableProps) => {
    const columns = Handler.columns(id);
    const allrowsLength = Handler.count({ tableId: id });
    const checkedRowsLength = Handler.count({ tableId: id, checked: true });
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
                                    Handler.update({ checked: false }, { checked: true, tableId: id });
                                } else if (isAllChecked) {
                                    Handler.update({ checked: false }, { checked: true, tableId: id });
                                } else {
                                    Handler.update({ checked: true }, { tableId: id });
                                }
                            }}
                        />
                    </TableCell>
                )}
                <Columns columns={columns} id={id} />
                {RowActions && <TableCell width={20}></TableCell>}
            </TableRow>
        </TableHead>
    );
};

export default withStore(TableColumns, (props: DataTableProps) => {
    return [Handler.observeColumns(props.id), Handler.count({ tableId: props.id, checked: true })];
});
