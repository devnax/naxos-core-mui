import React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Typography from '@mui/material/Typography';
import Handler from '../Handler';

interface Props {
    title: string;
}

const MobileNav = (props: Props) => {
    return (
        <Stack direction="row" gap={1} mb={1} alignItems="center">
            <IconButton
                size="small"
                onClick={() => {
                    Handler.mobileSidebarShow(true);
                }}
            >
                <ArrowBackRoundedIcon />
            </IconButton>
            <Typography variant="h5">{props.title}</Typography>
        </Stack>
    );
};

export default MobileNav;
