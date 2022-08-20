import React, { FC } from 'react';
import { DockIconProps } from '../types';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const DockIcon: FC<DockIconProps> = ({ active, icon, placement, buttonProps, iconProps, size }) => {
    size = size || 50;
    let bar_size = (size - 18) / 2;

    let activeStyle: any = {
        top: bar_size,
        left: 0,
        width: 3,
        height: 18
    };
    const isHorigental = placement === 'bottom' || placement === 'top';

    switch (placement) {
        case 'right':
            activeStyle = {
                top: bar_size,
                right: 0,
                width: 3,
                height: 18
            };
            break;
        case 'top':
            activeStyle = {
                top: 0,
                left: bar_size,
                width: 18,
                height: 3
            };
            break;
        case 'bottom':
            activeStyle = {
                bottom: 0,
                left: bar_size,
                width: 18,
                height: 3
            };
            break;
    }

    return (
        <Stack
            {...iconProps}
            alignItems="center"
            justifyContent="center"
            height={size}
            width={size}
            sx={{
                cursor: 'pointer',
                transition: 'all .2s',
                transform: active ? 'scale(1)!important' : '',
                '&:hover': {
                    transform: 'scale(1.1)'
                },
                position: 'relative',
                '&::after': {
                    content: "''",
                    position: 'absolute',
                    bgcolor: 'primary.main',
                    borderRadius: 1,
                    visibility: active ? 'visible' : 'hidden',
                    ...activeStyle
                }
            }}
        >
            <Button
                {...buttonProps}
                color={active ? 'primary' : 'inherit'}
                sx={{
                    p: 0,
                    borderRadius: 0,
                    m: 0,
                    width: size,
                    height: isHorigental ? size : size,
                    '& svg': {
                        fontSize: 35,
                        width: 28
                    }
                }}
            >
                {icon}
            </Button>
        </Stack>
    );
};

export default DockIcon;
