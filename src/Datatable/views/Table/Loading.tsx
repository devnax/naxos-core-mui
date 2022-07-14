import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { withStore } from 'state-range';
import { DataTableProps } from '../../types';
const TableLoading = ({ handler }: DataTableProps) => {
    const isLoading = handler.isLoading();

    return (
        <>
            {isLoading && (
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    zIndex={1}
                    // bgcolor="rgba(0,0,0,.3)"
                    display="flex"
                    justifyContent="center"
                >
                    <CircularProgress sx={{ mt: 10 }} />
                </Box>
            )}
        </>
    );
};

export default withStore(TableLoading, ({ handler }: DataTableProps) => [handler.isLoading()]);
