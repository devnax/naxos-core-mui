import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FileIcon, defaultStyles } from 'react-file-icon';
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/CloseOutlined';
import LinearProgress from '@mui/material/LinearProgress';


function byteToSize(bytes: any) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes === 0) return 'n/a';
   var i = parseInt(JSON.stringify(Math.floor(Math.log(bytes) / Math.log(1024))));
   if (i === 0) return bytes + ' ' + sizes[i];
   return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
}

interface FileListItemProps {
   name: string;
   type: string;
   size: number
}


const FileListItem = ({ name, type, size }: FileListItemProps) => {

   const t: any = name.split('.').pop()
   const def: any = defaultStyles

   return (
      <Stack
         direction="row"
         spacing={1.2}
         alignItems="center"
         width="100%"
      >
         <Stack width={45}>
            <FileIcon {...def[t as any]} />
         </Stack>
         <Stack
            direction="row"
            width="100%"
            alignItems="center"
         >
            <Stack flex={1} >
               <Typography variant="body1" fontSize={15}>
                  {name}
               </Typography>
               <Typography variant="subtitle1" fontSize={13}>
                  SIZE: {byteToSize(size)}
               </Typography>
               <LinearProgress
                  variant="determinate"
                  value={12}
                  sx={{
                     mt: 1
                  }}
               />
            </Stack>
         </Stack>
         <IconButton size="small" >
            <DeleteIcon fontSize="small" />
         </IconButton>
      </Stack>
   )
}


export default FileListItem