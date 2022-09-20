import React, { FC } from 'react';
import Sidebar from '../Sidebar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import DrawerHandler from './Handler';
import { DrawerProps } from './types';

const DrawerView: FC<DrawerProps> = ({ children, placement, ...props }) => {
    return (
        <Stack direction="row" height="100%">
            <Sidebar bgcolor="background.paper" order={placement === 'right' ? 1 : 0} {...props}>
                {children}
            </Sidebar>
            <Box height="100%" flex={1} onClick={() => DrawerHandler.close()}></Box>
        </Stack>
    );
};

export default DrawerView;
