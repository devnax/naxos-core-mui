import React from 'react'
import UploadingProgress from './UploadingProgress'
import Uploader from './Uploader'
import FileBucket from './FileManager'

const FileSystem = () => {
   return (
      <div>
         {/* <UploadingProgress /> */}
         {/* <Uploader placeholderIconType="css" title="Uploader" desc='Upload your file' placeholder='Drag & drop your file' /> */}
         <FileBucket />
      </div>
   )
}

export default FileSystem