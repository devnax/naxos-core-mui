import React from 'react'
import UploadingProgress from './UploadingPanel'
import Uploader from './Uploader'
import FileManager from './FileManager'
import Stack from '@mui/material/Stack'

const FileSystem = () => {
   return (
      <Stack p={3}>
         {/* <Uploader
            id="uploader"
            placeholderIconType="js"
            title="Uploader"
            desc='Upload your file'
            placeholder='Drag & drop your file'
         /> */}
         {/* <UploadingProgress id="uploader" /> */}
         <FileManager />
      </Stack>
   )
}

export default FileSystem