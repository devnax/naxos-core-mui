import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { FileIcon, defaultStyles } from 'react-file-icon';


function byteToSize(bytes: any) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes === 0) return 'n/a';
   var i = parseInt(JSON.stringify(Math.floor(Math.log(bytes) / Math.log(1024))));
   if (i === 0) return bytes + ' ' + sizes[i];
   return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
}

interface FileListItemProps {
   name: string;
   size: number;
   active: boolean
}

const GridItem = ({ name, size, active }: FileListItemProps) => {
   const theme = useTheme()

   return (
      <Stack
         spacing={1}
         alignItems="center"
         py={2}
         bgcolor={active ? alpha(theme.palette.primary.main, .1) : 'background.paper'}
         border={1}
         borderColor={active ? 'primary.main' : 'background.paper'}
         color={active ? '#fff' : ''}
         borderRadius={2}
         width={130}
         flexWrap="wrap"
         m={.5}

         sx={{
            cursor: 'pointer',
            '&:hover': {
               bgcolor: active ? alpha(theme.palette.primary.main, .1) : alpha(theme.palette.background.paper, .6),
            }
         }}
      >
         <Stack width={60}>
            <FileIcon extension="css" {...defaultStyles.css} />
         </Stack>
         <Stack spacing={.3} alignItems="center">
            <Typography variant="body1" fontSize={15}>
               {name}
            </Typography>
            <Typography variant="subtitle1" fontSize={13}>
               {byteToSize(size)}
            </Typography>
         </Stack>
      </Stack>
   )
}

export default GridItem