import React, { useEffect } from 'react';
import { withStore } from 'state-range';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Layer from '../../Layer';
import Dropdown from '../../Dropdown';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Scrollbar from 'react-browser-scrollbar';
import List from './List';
import Handler from '../Handler';
import { isDarkMode } from 'mui-themex';
import Skeleton from './Skeleton';

const NotificationView = () => {
    const settings = Handler.settings();

    useEffect(() => {
        if (settings.onLoad) {
            settings.onLoad();
        }
    }, []);

    return (
        <Stack direction="row" height="100%">
            <Box height="100%" flex={1} onClick={() => Layer.close()}></Box>
            <Stack
                sx={{
                    width: 350,
                    bgcolor: 'background.paper'
                }}
            >
                <Stack p={2} pb={1} direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="h5">Notifications</Typography>
                    </Box>
                    {settings.optionMenu && (
                        <Box>
                            <IconButton
                                size="small"
                                onClick={(e: any) => {
                                    if (settings.optionMenu) {
                                        Dropdown.show(e.currentTarget, settings.optionMenu);
                                    }
                                }}
                            >
                                <MoreHorizIcon />
                            </IconButton>
                        </Box>
                    )}
                </Stack>
                <Scrollbar
                    style={{ flex: 1, height: '100%' }}
                    darkMode={isDarkMode()}
                    onScrollEnd={() => {
                        if (settings.onLoadMore) {
                            settings.onLoadMore();
                        }
                    }}
                >
                    <Box p={1} height="100%">
                        <List />
                        {Handler.isLoading() && <Skeleton length={3} />}
                    </Box>
                </Scrollbar>
            </Stack>
        </Stack>
    );
};

export default withStore(NotificationView, () => [Handler.observeStoreData()]);
