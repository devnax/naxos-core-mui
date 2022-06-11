import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React from 'react';
import { withStore } from 'state-range';
import IconButton from '@mui/material/IconButton';
import BackIcon from '@mui/icons-material/ArrowBackRounded';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Scrollbar from 'react-browser-scrollbar';
import Setting from '../Handler';
import Layer from '../../Layer';
import { isDarkMode } from 'mui-themex';

const SettingSidebar = () => {
    const settings = Setting.getCategorySettings();
    const preview: any = Setting.getPreview();
    const isDark = isDarkMode();

    return (
        <Box
            sx={{
                flex: '1 0 auto',
                height: '100%',
                bgcolor: 'background.paper',
                display: 'flex',
                justifyContent: 'flex-end',
                p: 1
            }}
        >
            <Stack
                sx={{
                    width: 240,
                    height: '100%'
                }}
            >
                <Stack>
                    <Box sx={{ display: 'flex', alignItems: 'center', py: 1.5 }}>
                        <IconButton onClick={() => Layer.close()}>
                            <BackIcon />
                        </IconButton>
                        <Typography variant="h5" pl={1}>
                            {preview && preview?.category}
                        </Typography>
                    </Box>
                </Stack>
                <Scrollbar>
                    <List sx={{ pl: 1.5 }}>
                        {settings.map((setting: any) => {
                            return (
                                <ListItem
                                    key={setting._id}
                                    button
                                    selected={preview?._id === setting._id}
                                    onClick={() => {
                                        Setting.update({ preview: false }, { preview: true });
                                        Setting.update({ preview: true }, setting._id);
                                    }}
                                    sx={{ p: 0.8, pl: 1.5 }}
                                >
                                    <Typography sx={{ fontWeight: 400, fontSize: 15, color: isDark ? 'grey.400' : 'grey.900' }}>{setting.title}</Typography>
                                </ListItem>
                            );
                        })}
                    </List>
                </Scrollbar>
            </Stack>
        </Box>
    );
};

export default withStore(SettingSidebar);
