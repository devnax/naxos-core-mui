import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { useDropzone, DropzoneOptions } from 'react-dropzone'
import { FileIcon, defaultStyles } from 'react-file-icon';
import { withStore } from 'state-range'
import Handler from '../Handler'

interface FileUploaderProps extends DropzoneOptions {
   title: string;
   desc: string;
   placeholder: string;
   placeholderIconType: string,
   onDrop?: (files: File[]) => void;
   onUploadFinished?: (file: File) => void;
}


const FileUploader = ({ title, desc, placeholder, placeholderIconType, ...props }: FileUploaderProps) => {
   const theme = useTheme()
   const dropzone = useDropzone({
      ...props,
      maxFiles: 1,
      onDrop: (files, rejectedFiles) => {
         files.forEach(file => {
            Handler.createFile({
               file: file,
               name: file.name,
               size: file.size,
               uploading: true
            })
         })
         rejectedFiles.forEach(({ file, errors }) => {
            Handler.createFile({
               file: file,
               name: file.name,
               size: file.size,
               uploading: true,
               error: errors[0]
            })
         })
      }

   })

   const def: any = defaultStyles

   return (
      <Stack
         {...dropzone.getRootProps()}
         border='2px dashed'
         borderColor={dropzone.isDragActive ? theme.palette.primary.main : theme.palette.divider}
         borderRadius={2}
         p={3.5}
         sx={{ cursor: 'pointer' }}
      >
         <input {...dropzone.getInputProps()} />
         {
            dropzone.isDragActive ?
               <Stack spacing={2} alignItems="center" >
                  <Stack width={50}>
                     <FileIcon extension={placeholderIconType} {...def[placeholderIconType]} />
                  </Stack>
                  <Typography variant="body1" fontSize={13.5} fontWeight={600} color="primary" >
                     Drop the files here
                  </Typography>
               </Stack> :
               <Stack spacing={2} alignItems="center" width="100%" >
                  <Stack width={50}>
                     <FileIcon extension={placeholderIconType} {...def[placeholderIconType]} />
                  </Stack>
                  <Typography variant="body1" fontSize={13.5} fontWeight={600} >
                     {placeholder}
                  </Typography>
               </Stack>
         }
      </Stack>
   )
}

export default withStore(FileUploader)