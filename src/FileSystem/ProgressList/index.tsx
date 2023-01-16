import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FileIcon, defaultStyles } from 'react-file-icon';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/CloseOutlined';
import LinearProgress from '@mui/material/LinearProgress';
import { byteToSize } from '../utils';
import { FileRowProps } from '../types';
import { alpha } from '@mui/material/styles';
import Handler from '../FileSystem';
import { withStore } from 'state-range';

export const ProgressListItem = ({ name, progress, size, error, _id }: FileRowProps) => {
    const t: any = name.split('.').pop();
    const def: any = defaultStyles;

    return (
        <Stack direction="row" alignItems="center" width="100%" bgcolor={(theme) => (error ? alpha(theme.palette.error.main, 0.04) : 'background.default')} px={1} py={1} borderRadius={2} mb={0.5}>
            <Stack width={45}>
                <FileIcon {...def[t as any]} />
            </Stack>
            <Stack direction="row" width="100%" alignItems="center" pl={1.5}>
                <Stack flex={1}>
                    <Typography variant="body1" fontSize={14} color={error ? 'error' : 'inherit'}>
                        {name.slice(-30)}
                    </Typography>
                    <Typography variant="subtitle1" fontSize={12} color={error ? 'error.light' : 'inherit'}>
                        {error ? error : <>SIZE: {byteToSize(size)}</>}
                    </Typography>
                    {!error && (
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                                mt: 1,
                                '& span': {
                                    height: 5
                                }
                            }}
                        />
                    )}
                </Stack>
            </Stack>
            <IconButton
                size="small"
                onClick={() => {
                    const item = Handler.findById(_id);
                    if (item && item.signal) {
                        item.signal.abort();
                    }
                    Handler.delete(_id);
                }}
            >
                <DeleteIcon fontSize="small" />
            </IconButton>
        </Stack>
    );
};

interface ProgressListProps {
    bucketId: string;
    rejected?: boolean;
}

const ProgressList = ({ bucketId, rejected }: ProgressListProps) => {
    const files = Handler.find({ bucketId, uploading: true, rejected: rejected || false });

    return (
        <>
            {files.map((file, idx) => (
                <ProgressListItem key={idx} {...file} />
            ))}
        </>
    );
};

export default withStore(ProgressList, ({ bucketId, rejected }: ProgressListProps) => {
    const files = Handler.find({ bucketId, rejected: rejected || false });
    return [files];
});
