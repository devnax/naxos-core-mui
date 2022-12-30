import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Dropdown } from '../..';
import ProgressList from '../ProgressList';
import { withStore } from 'state-range';
import Handler from '../Handler';
import Typography from '@mui/material/Typography';
import Scrollbar from 'react-browser-scrollbar';
import { isDarkMode } from 'mui-themex';

export interface FileUploadingProps {
    id: string;
}

const UploadingPanel = (props: FileUploadingProps) => {
    const { id } = props;
    const files = Handler.find({ typeid: id, rejected: false, uploading: true });
    const isDark = isDarkMode();
    return (
        <Stack direction="row">
            <Button
                size="large"
                color="primary"
                variant="contained"
                sx={{
                    borderRadius: '100%',
                    p: 0,
                    width: 60,
                    height: 60
                }}
                onClick={(e: any) => {
                    Dropdown.show(
                        e.currentTarget,
                        <Stack bgcolor="background.paper" width={400} borderRadius={2} boxShadow={5}>
                            <Stack p={2}>
                                <Typography variant="h6">File Uploading</Typography>
                                <Typography variant="subtitle1" mb={1} sx={{ opacity: 0.6 }}>
                                    Panding {files.length} files
                                </Typography>
                            </Stack>
                            <Scrollbar thumbSize={3} style={{ maxHeight: 400, padding: 12 }} darkMode={isDark}>
                                <ProgressList id={id} />
                            </Scrollbar>
                        </Stack>,
                        {
                            placement: 'bottom-start'
                        }
                    );
                }}
            >
                <UploadFileIcon fontSize="large" />
            </Button>
        </Stack>
    );
};

export default withStore(UploadingPanel);
