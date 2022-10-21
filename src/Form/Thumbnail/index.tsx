import React from 'react';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '../../Form/TextField';
import IconButton from '@mui/material/IconButton';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import RefreshIcon from '@mui/icons-material/RefreshRounded';
import VideoIcon from '@mui/icons-material/VideoCallRounded';
import { any, blast, optional } from '../../Validex';
import Select from '../Select';
import { ThumbnailProps } from './types';

import ImagePreview from './ImagePreview';
import VideoPreview from './VideoPreview';

const Thumbnail = (props: ThumbnailProps) => {
    let { name, form, defaultValue, value, onClick, defaultType, type, hideUrl, schema, height, width } = props;
    const type_name = `${name}_type`;

    React.useEffect(() => {
        if (!form?.get(name)) {
            if (defaultValue) {
                form?.set(name, defaultValue);
            } else {
                form?.set(name, null);
            }
        }

        if (!form?.get(type_name)) {
            form.set(type_name, type || defaultType || 'image');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (schema) {
            form?.setSchema(name, schema(any().field(name)));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form?.observe().data]);

    value = value || form?.get(name);
    let _type = type || form?.get(type_name);

    height = height || 200;
    width = width || '100%';

    return (
        <Stack spacing={2}>
            <Box sx={{ position: 'relative' }}>
                {value && (
                    <Box sx={{ position: 'absolute', top: '2px', right: '2px', zIndex: 999 }}>
                        {onClick && (
                            <IconButton onClick={() => onClick && onClick()} size="small" sx={{ boxShadow: 2, bgcolor: 'rgba(0,0,0,.3)!important', m: 0.3 }}>
                                <RefreshIcon sx={{ fontSize: 20 }} />
                            </IconButton>
                        )}
                        <IconButton onClick={() => form.delete(name)} size="small" sx={{ boxShadow: 2, bgcolor: 'rgba(0,0,0,.3)!important', m: 0.3 }}>
                            <ClearRoundedIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                    </Box>
                )}

                <ImagePreview {...props} type={_type} value={value} height={height} width={width} />
                <VideoPreview {...props} type={_type} value={value} height={height} width={width} />
                {!value && (
                    <Avatar
                        onClick={() => onClick && onClick()}
                        variant="rounded"
                        sx={{
                            width,
                            height,
                            bgcolor: 'grey.800',
                            border: 0,
                            borderColor: 'rgba(255,255,255,.1)',
                            borderStyle: 'dashed',
                            cursor: !value ? 'pointer' : 'initial'
                        }}
                    >
                        {_type !== 'image' ? <VideoIcon /> : <AddPhotoIcon />}
                    </Avatar>
                )}
            </Box>
            {!hideUrl && (
                <Box>
                    <TextField
                        label="Enter URL"
                        name={name}
                        form={form}
                        schema={(s) => s.optional().url()}
                        onChange={(e: any) => {
                            const val = e.target.value;
                            form.set(name, val);
                            try {
                                blast(optional().url(), val);
                            } catch (err: any) {
                                form.setError(name, err.message);
                            }
                        }}
                    />
                </Box>
            )}

            {!type && (
                <Box>
                    <Select
                        label="Select Type"
                        name={type_name}
                        defaultValue={_type}
                        form={form}
                        options={[
                            { label: 'Image', value: 'image' },
                            { label: 'Video', value: 'video' }
                        ]}
                    />
                </Box>
            )}
        </Stack>
    );
};

export default Thumbnail;
