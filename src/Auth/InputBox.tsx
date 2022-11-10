import React from 'react'
import Stack from '@mui/material/Stack'
import InputBase from '@mui/material/InputBase'
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
            }}
         >
            <ArrowLeftIcon />
         </IconButton>
         <InputBase
            placeholder='email or phone'
            sx={{
               bgcolor: alpha(theme.palette.common.white, 0.04),
               border: '0px!important',
               borderRadius: '4px!important',
               outline: 0,
               p: 1,
               py: .1,
               fontSize: 15,
               boxShadow: 'none!important',

               '&: hover': {
                  bgcolor: alpha(theme.palette.common.white, 0.08)
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