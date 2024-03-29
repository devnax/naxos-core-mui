import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CheckBox from '@mui/material/Checkbox';
import TableColumns from './Columns';
import { DataTableProps, ColumnProps, StoreRowProps } from '../../types';
import { withStore, withMemo } from 'state-range';
import { Row } from 'state-range/src/types';
import { alpha, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dropdown from '../../../Dropdown';
import TableLoading from './Loading';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import Typography from '@mui/material/Typography';

const _rowColMap = ({ row, columns }: any) => {
    return columns.map(({ field, ...rest }: ColumnProps, idx: number) => {
        const val = row[field];
        if (!val) {
            return (
                <TableCell key={idx} sx={{ color: 'red' }}>
                    Invalid field
                </TableCell>
            );
        }
        return (
            <TableCell key={idx} {...rest}>
                {val}
            </TableCell>
        );
    });
};

const RowColMap = withMemo(_rowColMap, ({ row }: any) => {
    return [row.observe];
});

const _Row = ({ handler, row, rowActions }: { row: Row<StoreRowProps> } & DataTableProps) => {
    const checkbox = handler.getMeta('checkbox');
    const columns = handler.getMeta('columns');
    const theme = useTheme();

    if (handler.renderRow) {
        row = handler.renderRow({ ...row }) as any;
    }
    let RowActions: any = false;
    if (rowActions) {
        RowActions = rowActions({ ...row });
    }

    const checked = row.checked || false;

    return (
        <TableRow
            sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                bgcolor: checked ? alpha(theme.palette.primary.main, 0.16) : ''
            }}
        >
            {checkbox && (
                <TableCell padding="checkbox">
                    <CheckBox
                        name={row.id.toString()}
                        checked={checked}
                        onChange={(e: any) => {
                            handler.update({ checked: e.target.checked }, row._id);
                        }}
                    />
                </TableCell>
            )}
            <RowColMap row={row} columns={columns} />
            {RowActions && (
                <TableCell width={20} padding="checkbox">
                    <IconButton
                        onClick={(e: any) => {
                            Dropdown.show(e.currentTarget, RowActions, { placement: 'bottom-start' });
                        }}
                        size="small"
                    >
                        <MoreVertIcon />
                    </IconButton>
                </TableCell>
            )}
        </TableRow>
    );
};

const Row = withStore(_Row, ({ row }: any) => {
    return [row.observe];
});

const TableView = (props: DataTableProps) => {
    const { handler } = props;
    const rows = handler.findAll();

    return (
        <Box sx={{ borderRadius: 2, position: 'relative' }}>
            <TableLoading {...props} />
            {!rows.length && !handler.isLoading() ? (
                <Stack sx={{ userSelect: 'none' }} height={200} justifyContent="center" alignItems="center">
                    <Box textAlign="center">
                        <InboxRoundedIcon sx={{ fontSize: 50, opacity: 0.5 }} />
                        <Typography variant="h5" sx={{ opacity: 0.5 }}>
                            No Rows
                        </Typography>
                    </Box>
                </Stack>
            ) : (
                <Table>
                    <TableColumns {...props} />
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row._id} {...props} row={row} />
                        ))}
                    </TableBody>
                </Table>
            )}
        </Box>
    );
};

export default withStore(TableView);
