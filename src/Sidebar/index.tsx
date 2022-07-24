import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Scrollbar from '../Scrollbar';
import { SidebarProps } from './types';
import { isServer } from '../utils'

const Sidebar: React.FC<SidebarProps> = ({ header, fixed, fullHeight, footer, children, ...props }) => {
    fullHeight = fullHeight === undefined || fullHeight === true
    let height: any = '100%'
    if (fullHeight) {
        height = isServer ? "100%" : window.innerHeight
    }

    fixed = fixed === undefined || fixed === true
    if (fixed) {
        props.position = "sticky"
        props.top = 0
    }

    return (
        <Stack
            maxWidth={270}
            bgcolor="background.default"
            height={height}
            {...props}
        >
            {header && <Box>{header}</Box>}
            <Scrollbar
                style={{
                    height,
                    flex: 1
                }}
            >
                {children}
            </Scrollbar>
            {footer && <Box>{footer}</Box>}
        </Stack>
    );
};

export default Sidebar;
