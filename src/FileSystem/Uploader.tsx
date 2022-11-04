import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { useDropzone, DropzoneOptions } from 'react-dropzone'
import { FileIcon, defaultStyles } from 'react-file-icon';
import FileListItem from './components/FileListItem'

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
   const dropzone = useDropzone({ ...props })

   const def: any = defaultStyles

   return (
      <Stack
         alignItems="center"
         justifyContent="center"
         height="100%"
         width="100%"
      >
         <Stack
            bgcolor="background.paper"
            p={3}
            borderRadius={3}
            width={400}
            alignItems="center"
            spacing={3}
         >
            <Stack alignItems="center" spacing={.5}>
               <Typography variant="h6" fontSize={18}>
                  {title}
               </Typography>
               <Typography variant="body1" fontSize={12} fontWeight={600}>
                  {desc}
               </Typography>
            </Stack>
            <Stack width="100%" >
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
            </Stack>
            <Stack width="100%" spacing={2} >

               {
                  dropzone.acceptedFiles.map((file, idx) => {
                     return <FileListItem
                        type={file.type}
                        name={file.name}
                        size={file.size}
                        key={idx}
                     />
                  })
               }
            </Stack>
         </Stack>
      </Stack>
   )
}

export default FileUploader