import React from 'react';
import FileManager from './FileManager';
import FileGrid from './FileGrid';
import Uploader from './Uploader';
import UploadingProgress from './UploadingPanel';
import Stack from '@mui/material/Stack';
import Handler from './Handler';

const FileSystem = () => {
    return (
        <Stack p={3}>
            {/* <Uploader
                bucketId="uploader"
                placeholderIconType="js"
                title="Uploader"
                desc='Upload your file'
                placeholder='Drag & drop your file'
            />
            <UploadingProgress bucketId="uploader" /> */}
            <FileGrid

                fileWidth={250}
                fileHeight={270}

                onClick={({ _id, selected }) => {
                    console.log(selected);

                    selected ? Handler.unSelectFile(_id) : Handler.selectFile(_id)
                }}
                onContextMenu={(file) => {

                    return [
                        {
                            title: "Preview"
                        },
                        {
                            title: "Information"
                        },
                        {
                            title: "Delete"
                        }
                    ]
                }}
            />
        </Stack>
    );
};

export default FileSystem;
