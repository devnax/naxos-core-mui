import React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/CloseRounded';
import Typography from '@mui/material/Typography';
import AnimateBox from '../../components/AnimateBox';
import Handler from '../Handler';
import { NotifyRowProps } from '../types';
import { AnimationType } from 'fmotion-variants';

interface Props extends NotifyRowProps {
    _id: string;
    animation: AnimationType;
}

const NotifyItem = ({ animation, _id, title, icon, content, small, type, closeButton, onClick, onHide, ...rest }: Props) => {
    let color = {};
    if (type) {
        color = {
            bgcolor: `${type}.main`,
            color: 'grey.100'
        };
    }

    return (
        <AnimateBox key={_id} type={animation}>
            <Stack
                width={small ? 200 : 300}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                p={0.5}
                px={1.5}
                borderRadius={2}
                boxShadow={3}
                height={small ? 50 : 55}
                spacing={2}
                bgcolor="background.paper"
                onMouseEnter={() => Handler.pauseTime(_id)}
                onMouseLeave={() => Handler.startTime(_id)}
                {...color}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    onClick={() => onClick && onClick({ _id, title, icon, content, type, onHide, ...rest })}
                    sx={{
                        cursor: onClick && 'pointer'
                    }}
                >
                    {icon && <Box>{icon}</Box>}
                    <Box flex={1}>
                        <Typography variant="body2" color={type && '#fff'} fontSize={small ? 13 : 15} mb={0.4} fontWeight={600}>
                            {title}
                        </Typography>
                        {content && (
                            <Typography color={type && 'grey.200'} variant="subtitle1" fontSize={small ? 12 : 13} fontWeight={500} lineHeight="15px">
                                {content}
                            </Typography>
                        )}
                    </Box>
                </Stack>

                {(closeButton === undefined || closeButton) && (
                    <Box>
                        <IconButton
                            size="small"
                            onClick={() => {
                                onHide && onHide({ _id, title, icon, content, type, onHide, ...rest });
                                Handler.hide(_id);
                            }}
                        >
                            <CloseIcon sx={{ fontSize: `${small ? 12 : 16}px!important`, color: type && '#fff' }} />
                        </IconButton>
                    </Box>
                )}
            </Stack>
        </AnimateBox>
    );
};

export default NotifyItem;
