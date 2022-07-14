import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataTableProps } from '../types';
import { alpha, useTheme } from '@mui/material/styles';
import { withStore } from 'state-range';

const NavAction = (props: DataTableProps) => {
    const { handler, selectActions: Action } = props;
    const theme = useTheme();
    return (
        <Stack
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            zIndex={1}
            bgcolor={alpha(theme.palette.primary.main, 0.2)}
            p={1}
            px={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            borderRadius={1}
        >
            <Box mr={2}>
                <Typography variant="body2" fontWeight="bold" color="#fff">
                    Selected {handler.selectedRows().length} Items
                </Typography>
            </Box>
            <Box>{Action && <Action selected={handler.selectedRows()} />}</Box>
        </Stack>
    );
};

export default withStore(NavAction);
