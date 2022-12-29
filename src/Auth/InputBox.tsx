import React from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import { alpha, useTheme } from '@mui/material/styles'

import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


const InputBox = () => {
   const theme = useTheme()

   return (
      <Stack
         direction="row"
         spacing={1}
         alignItems="center"
      >
         <IconButton
            size="small"
            sx={{
               bgcolor: 'rgba(255, 255, 255, 0.04)',
               visibility: "hidden"
            }}
         >
            <ArrowLeftIcon />
         </IconButton>
         <TextField
            placeholder='email or phone'
            size="small"
            sx={{

               '&: hover': {
               }
            }}
         />
         <IconButton
            size="small"
            sx={{
               bgcolor: alpha(theme.palette.common.white, 0.04)
            }}
         >
            <ArrowRightIcon />
         </IconButton>
      </Stack>
   )
}

export default InputBox