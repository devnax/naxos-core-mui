import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { DropzoneOptions } from 'react-dropzone'
import ProressFileItem from '../components/ProgressFileItem'
import { withStore } from 'state-range'
import Handler from '../Handler'
import Scrollbar from '../../Scrollbar'
import UploadBox from '../UploadBox'


interface FileUploaderProps extends DropzoneOptions {
   title: string;
   desc: string;
   placeholder: string;
   placeholderIconType: string,
   onDrop?: (files: File[]) => void;
   onUploadFinished?: (file: File) => void;
}



const List = withStore(() => {
   const pandingFiles = Handler.find({ uploading: true })

   return (
      <>
         {
            pandingFiles.map((file, idx) => <ProressFileItem
               key={idx}
               {...file}
            />)
         }
      </>
   )
})


const FileUploader = (props: FileUploaderProps) => {
   const { title, desc } = props
   return (
      <Stack
         bgcolor="background.paper"
         borderRadius={3}
         width={400}
         py={2}
      >
         <Stack alignItems="center" spacing={.5}>
            <Typography variant="h6" fontSize={18}>
               {title}
            </Typography>
            <Typography variant="body1" fontSize={12} fontWeight={600}>
               {desc}
            </Typography>
         </Stack>

         <Stack width="100%" p={2}>
            <UploadBox {...props} />
         </Stack>
         <Stack
            maxHeight={350}
         >
            <Scrollbar style={{ padding: 10 }} thumbSize={2}>
               <List />
            </Scrollbar>
         </Stack>
      </Stack>
   )
}

export default withStore(FileUploader)