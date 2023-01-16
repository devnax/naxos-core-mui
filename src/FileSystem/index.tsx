import React from 'react';
import FileManager from './FileManager';
import FileGrid from './FileGrid';
import FileList from './FileList';
import Uploader from './Uploader';
import UploadBox from './UploaderBox';
import UploadingProgress from './UploadingPanel';
import Stack from '@mui/material/Stack';
import FileSystem from './FileSystem';

export { FileSystem }



const FileSystemView = () => {
    return (
        <Stack p={3}>
            {/* <UploadBox
                bucketId="uploader"
                placeholderIconType="js"
                title="Uploader"
                desc='Upload your file'
                placeholder='Drag & drop your file'
            /> */}
            {/* <Uploader
                bucketId="uploader"
            />
            <UploadingProgress bucketId="uploader" /> */}
            <FileList

                // fileWidth={250}
                // fileHeight={270}

                onClick={({ _id, selected }) => {
                    console.log(selected);

                    selected ? FileSystem.unSelectFile(_id) : FileSystem.selectFile(_id)
                }}
                onFileRender={(file) => {
                    if (file.extention) {
                        return true
                    }

                    return false
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

export default FileSystemView;
