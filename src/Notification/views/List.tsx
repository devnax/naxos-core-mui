import React from 'react';
import { withStore } from 'state-range';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dropdown, { DropdownArrayType } from '../../Dropdown';
import Handler from '../Handler';
import { NotificationPropsRow } from '../types';

import InboxRoundedIcon from '@mui/icons-material/InboxRounded'


const Item = ({ id, read, title, icon, content, created, buttonText, onButtonClick, onClick }: NotificationPropsRow) => {
    const settings = Handler.settings();

    return (
        <Stack
            direction="row"
            spacing={1}
            p={1}
            borderRadius={2}
            sx={{
                cursor: 'pointer',
                userSelect: 'none',
                position: 'relative',
                '&:hover': {
                    bgcolor: 'background.default',
                    '& > div:first-of-type': {
                        visibility: 'visible'
                    }
                }
            }}
            {...(onClick ? { onClick: () => onClick(id) } : {})}
        >
            {settings.itemOptionMenu && (
                <Box position="absolute" bottom={5} right={5} visibility="hidden">
                    <IconButton
                        size="small"
                        onClick={(e: any) => {
                            const menus = settings.itemOptionMenu || [];
                            Dropdown.show(
                                e.currentTarget,
                                menus.map((menu: any): DropdownArrayType => {
                                    return {
                                        ...menu,
                                        onClick: () => menu.onClick && menu.onClick(id)
                                    };
                                })
                            );
                        }}
                    >
                        <MoreVertIcon fontSize="small" />
                    </IconButton>
                </Box>
            )}

            {!read && <Box position="absolute" top={5} left={0} bgcolor="primary.main" width={8} height={8} borderRadius={8}></Box>}

            {icon && (
                <Box>
                    <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                        <Box width={45} mt={0.6}>
                            {icon}
                        </Box>
                    </Badge>
                </Box>
            )}

            <Box>
                <Typography component="span" variant="body1" color="text.primary" fontSize={13} sx={{ fontWeight: 700, display: 'inline' }}>
                    {title}
                </Typography>

                {created && (
                    <Typography variant="body1" color="text.secondary" fontSize={11} sx={{ fontWeight: 500 }}>
                        {created}
                    </Typography>
                )}
                {content && (
                    <Typography variant="subtitle1" color="text.secondary" fontSize={14} sx={{ fontWeight: 400, mt: 0.6, lineHeight: '18px' }}>
                        {content.substring(0, 80)}
                    </Typography>
                )}

                {buttonText && (
                    <Stack direction="row" spacing={1} justifyContent="flex-start" mt={1}>
                        {buttonText[0] && (
                            <Button onClick={() => onButtonClick && onButtonClick(buttonText[0])} size="small" sx={{ py: 0, px: 1 }} variant="contained" color="primary">
                                {buttonText[0]}
                            </Button>
                        )}
                        {buttonText[1] && (
                            <Button onClick={() => onButtonClick && onButtonClick(buttonText[1])} size="small" sx={{ py: 0, px: 1 }} variant="contained" color="secondary">
                                {buttonText[1]}
                            </Button>
                        )}
                    </Stack>
                )}
            </Box>
        </Stack>
    );
};

const ItemRender = withStore(Item, (item: any) => [item.observe]);

const List = () => {
    const notifications = Handler.findAll();

    return (
        <Stack px={0.5} spacing={0.5} height="100%">
            {
                !notifications.length ? <Stack sx={{ userSelect: 'none', height: '100%' }} justifyContent="center" alignItems="center">
                    <Box textAlign='center'>
                        <InboxRoundedIcon sx={{ fontSize: 30, opacity: .5 }} />
                        <Typography variant="h6" sx={{ opacity: .5 }}>No Items</Typography>
                    </Box>
                </Stack> : ''
            }
            {notifications.map((notif: any) => (
                <ItemRender key={notif.id} {...notif} />
            ))}
        </Stack>
    );
};

export default withStore(List);
