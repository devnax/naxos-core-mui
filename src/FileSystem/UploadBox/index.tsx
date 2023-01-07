import React, { ComponentType } from 'react';
import Stack, { StackProps } from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useDropzone, DropzoneState, DropzoneOptions, FileRejection } from 'react-dropzone';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { withStore } from 'state-range';
import Handler from '../Handler';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface FileUploadBoxProps {
    bucketId: string;
    title?: string;
    desc?: string;
    placeholder?: string;
    placeholderIconExtention?: string;
    onDrop?: (files: File[], rejectedFiles: FileRejection[]) => void;
    dropzoneProps?: DropzoneOptions;
    requestUrl?: string;
    requestProps?: AxiosRequestConfig;
    onUploadFinished?: (res: AxiosResponse) => void;
    onUploadError?: (err: any) => void;
    containerProps?: StackProps;
    renderTemplate?: ComponentType<{ dropzone: DropzoneState }>;
}

const Template = (props: FileUploadBoxProps & { dropzone: DropzoneState }) => {
    const theme = useTheme();

    const { title, desc, placeholder, placeholderIconExtention, dropzone } = props;
    const def: any = defaultStyles;

    return (
        <Stack border="2px dashed" borderColor={dropzone.isDragActive ? theme.palette.primary.main : theme.palette.divider} borderRadius={2} p={3.5} sx={{ cursor: 'pointer' }}>
            {dropzone.isDragActive ? (
                <Stack spacing={2} alignItems="center">
                    {placeholderIconExtention && (
                        <Stack width={50}>
                            <FileIcon extension={placeholderIconExtention} {...def[placeholderIconExtention]} />
                        </Stack>
                    )}
                    {placeholder && (
                        <Typography variant="body1" fontSize={13.5} fontWeight={600} color="primary">
                            {placeholder}
                        </Typography>
                    )}
                </Stack>
            ) : (
                <Stack alignItems="center" width="100%">
                    {placeholderIconExtention && (
                        <Stack width={50} mb={2}>
                            <FileIcon extension={placeholderIconExtention} {...def[placeholderIconExtention]} />
                        </Stack>
                    )}

                    {title && (
                        <Typography variant="body1" fontSize={14} fontWeight={600}>
                            {title}
                        </Typography>
                    )}
                    {desc && (
                        <Typography variant="subtitle1" fontSize={14} fontWeight={500} sx={{ opacity: 0.5 }}>
                            {desc}
                        </Typography>
                    )}
                </Stack>
            )}
        </Stack>
    );
};

const FileUploadBox = (props: FileUploadBoxProps) => {
    const { bucketId, requestUrl, requestProps, onUploadFinished, onUploadError, dropzoneProps, onDrop, containerProps, renderTemplate: CustomTemplate } = props;

    const dropzone = useDropzone({
        ...dropzoneProps,
        onDrop: (files, rejectedFiles) => {
            Handler.delete({ bucketId, rejected: true });

            if (!rejectedFiles.length) {
                files.forEach((file) => {
                    const created = Handler.createFile({
                        bucketId,
                        file: file,
                        name: file.name,
                        size: file.size,
                        uploading: true
                    });

                    if (requestUrl) {
                        const controller = new AbortController();
                        Handler.update({ signal: controller }, created._id);
                        axios
                            .postForm(
                                requestUrl,
                                { file },
                                {
                                    onUploadProgress: (progressEvent) => {
                                        let progress = (progressEvent.loaded / (progressEvent.total || file.size)) * 100;
                                        if (progress >= 100) {
                                            Handler.update(
                                                {
                                                    progress: 0,
                                                    uploading: false,
                                                    file: null,
                                                    signal: null
                                                },
                                                created._id
                                            );
                                        } else {
                                            Handler.update({ progress: Math.floor(progress) }, created._id);
                                        }
                                    },
                                    signal: controller.signal,
                                    ...requestProps
                                }
                            )
                            .then((response) => {
                                onUploadFinished && onUploadFinished(response);
                            })
                            .catch((error) => {
                                onUploadError && onUploadError(error);
                            });
                    }
                });
            } else {
                const { errors } = rejectedFiles[0];
                Handler.createFile({
                    bucketId,
                    rejected: true,
                    error: errors[0].message
                });
            }

            onDrop && onDrop(files, rejectedFiles);
        }
    });

    return (
        <Stack {...dropzone.getRootProps()} display="inline-block" {...containerProps}>
            <input {...dropzone.getInputProps()} />
            {CustomTemplate ? <CustomTemplate dropzone={dropzone} /> : <Template dropzone={dropzone} {...props} />}
        </Stack>
    );
};

export default withStore(FileUploadBox);
