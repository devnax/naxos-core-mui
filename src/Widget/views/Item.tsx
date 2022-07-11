import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import IconButton from '@mui/material/IconButton';
import Dropdown from '../../Dropdown';
import { WidgetOption } from '../types';

const WidgetItem = ({ title, icon, render, optionMenu }: WidgetOption) => {
    return (
        <Stack bgcolor="background.paper" borderRadius={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" p={0.5} px={1}>
                <Stack direction="row" gap={1} justifyContent="center" alignItems="center">
                    {icon}
                    <Typography variant="subtitle2">{title}</Typography>
                </Stack>
                <Box>
                    {optionMenu && (
                        <IconButton
                            size="small"
                            onClick={(e: any) => {
                                Dropdown.show(e.currentTarget, optionMenu);
                            }}
                        >
                            <MoreVertRoundedIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                    )}
                </Box>
            </Stack>
            <Box p={0.5} px={1}>
                {render}
            </Box>
        </Stack>
    );
};

export default WidgetItem;
