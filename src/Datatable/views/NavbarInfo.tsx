import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import NavAction from './NavbarAction';
import { DataTableProps } from '../types';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import { withStore } from 'state-range';

const NavbarInfo = (props: DataTableProps) => {
    const { handler } = props;
    const selectedRows = handler.selectedRows();
    const rows = handler.findAll();
    const pagination = handler.getMeta('pagination');
    let perpage = 25;
    let perpageOptions: number[] = [];

    if (pagination) {
        if (pagination.perpageOptions) {
            perpage = pagination.perpageOptions[0];
            perpageOptions = pagination.perpageOptions;
        }
        if (pagination.perpage) {
            perpage = pagination.perpage;
        }
    }

    if (!rows.length) {
        return <></>;
    }

    return (
        <Stack p={1} direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" position="relative" height={50}>
            {!selectedRows.length && (
                <>
                    <Typography variant="body2">Showing {rows.length} items</Typography>
                    {pagination && pagination.rowCount && (
                        <TablePagination
                            component={Box}
                            count={pagination.rowCount}
                            rowsPerPage={perpage}
                            rowsPerPageOptions={perpageOptions}
                            page={pagination?.page || 0}
                            onPageChange={(_e: any, page) => {
                                const meta = handler.getMeta('pagination');
                                handler.setMeta('pagination', {
                                    ...(meta || {}),
                                    page
                                });

                                if (handler.onPaginationChange) {
                                    handler.onPaginationChange();
                                }

                                if (handler.onStateChange) {
                                    handler.onStateChange();
                                }
                            }}
                            onRowsPerPageChange={(e: any) => {
                                const meta = handler.getMeta('pagination');
                                handler.setMeta('pagination', {
                                    ...(meta || {}),
                                    perpage: e.target.value
                                });

                                if (handler.onPaginationChange) {
                                    handler.onPaginationChange();
                                }

                                if (handler.onStateChange) {
                                    handler.onStateChange();
                                }
                            }}
                        />
                    )}
                </>
            )}
            {selectedRows.length ? <NavAction {...props} selectedRows={selectedRows} /> : ''}
        </Stack>
    );
};
export default withStore(NavbarInfo);
