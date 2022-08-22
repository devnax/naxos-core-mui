import React, { FC } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Dropdown from '../../Dropdown';
import Notification from '../../Notification';
import { DockProps } from '../types';
import NotificationsIcon from '@mui/icons-material/NotificationsRounded';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import AppsRender from './RenderApps';

const DockFooter: FC<DockProps> = (props) => {
    const { placement, menuIcon, menuItems, notification, onMenuShow } = props;
    const isHorigental = placement === 'bottom' || placement === 'top';

    return (
        <Stack
            alignItems="center"
            justifyContent={isHorigental ? 'flex-end' : 'center'}
            p={isHorigental ? '0 8px' : '4px 0'}
            direction={isHorigental ? 'row' : 'column'}
            height={isHorigental ? '100%' : 'initial'}
            width={isHorigental ? 'initial' : '100%'}
            gap={1}
            bgcolor="background.paper"
            borderRadius={isHorigental ? '24px 0 0 24px' : '24px 24px 0 0'}
        >
            <Box display="inline-flex" flexDirection={isHorigental ? 'row' : 'column'} bgcolor="background.paper" borderRadius={isHorigental ? '0 24px 24px 0' : '0 0 24px 24px'}>
                <AppsRender renderFooter {...props} />
            </Box>
            {notification && (
                <IconButton
                    sx={{ mb: "7px" }}
                    onClick={() => {
                        Notification.open();
                    }}
                    size="small"
                >
                    <NotificationsIcon />
                </IconButton>
            )}

            {menuItems && (
                <Box
                    onClick={(e: any) => {
                        if (menuItems) {
                            Dropdown.show(e.currentTarget, menuItems, {
                                sx: {
                                    '& svg': {
                                        fontSize: '21px!important'
                                    },
                                    '& .MuiListItemIcon-root': {
                                        minWidth: '30px!important'
                                    }
                                },
                                placement
                            });

                            if (typeof onMenuShow === 'function') {
                                onMenuShow();
                            }
                        }
                    }}
                >
                    {typeof menuIcon === 'string' ? (
                        <Avatar
                            sx={{
                                width: 26,
                                height: 26,
                                cursor: 'pointer',
                                boxShadow: '0 0 0 2px rgba(255,255,255, .2)'
                            }}
                            src={menuIcon}
                        />
                    ) : (
                        <IconButton
                            sx={{
                                '& svg': {}
                            }}
                        >
                            {menuIcon}
                        </IconButton>
                    )}
                </Box>
            )}
        </Stack>
    );
};

export default DockFooter;
