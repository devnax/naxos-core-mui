import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { withStore } from 'state-range';
import Scrollbar from '../../Scrollbar';
import UploadBox, { UploaderProps } from '../Uploader';
import ProgressList from '../ProgressList';
import Handler from '../FileSystem';

export interface UploaderBoxProps {
    bucketId: string;
    title: string;
    desc: string;
    dropboxProps?: Partial<UploaderProps>;
}

const FileUploader = (props: UploaderBoxProps) => {
    const { bucketId, title, desc, dropboxProps } = props;

    const rejectedFirst = Handler.findFirst({ bucketId, rejected: true });

    return (
        <Stack bgcolor="background.paper" borderRadius={3} width={400} py={2}>
            <Stack alignItems="center" spacing={0.5}>
                <Typography variant="h6" fontSize={18}>
                    {title}
                </Typography>
                <Typography variant="body1" fontSize={12} fontWeight={600}>
                    {desc}
                </Typography>
            </Stack>

            <Stack width="100%" p={2}>
                <UploadBox {...dropboxProps} bucketId={bucketId} />
            </Stack>

            <Stack maxHeight={350}>
                {rejectedFirst && (
                    <Stack p={1.2}>
                        <Alert variant="filled" severity="error" onClose={() => Handler.delete(rejectedFirst._id)}>
                            {rejectedFirst.error}
                        </Alert>
                    </Stack>
                )}

                <Scrollbar style={{ padding: 10 }} thumbSize={2}>
                    <ProgressList bucketId={bucketId} />
                </Scrollbar>
            </Stack>
        </Stack>
    );
};

export default withStore(FileUploader);
