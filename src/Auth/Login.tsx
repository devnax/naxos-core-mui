import React from 'react'
import Stack from '@mui/material/Stack'
import Card from './AuthCard'
import { useForm } from '../Form/useForm'
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import IconButton from '@mui/material/IconButton'
import TextField from '../Form/TextField';
import { alpha, useTheme } from '@mui/material/styles'

const Login = () => {
   const theme = useTheme()
   const form = useForm()

   return (
      <Stack
         spacing={5}
         width={350}
      >
         <Card />
         <Stack direction="row" spacing={1}>
            <IconButton
               sx={{
                  bgcolor: (theme) => alpha(theme.palette.common.white, 0.04)
               }}
            >
               <ArrowLeftIcon />
            </IconButton>
            <Stack flex={1}>
               <TextField
                  name="login"
                  form={form}
               />
            </Stack>
            <IconButton
               sx={{
                  bgcolor: (theme) => alpha(theme.palette.common.white, 0.04)
               }}
            >
               <ArrowRightIcon />
            </IconButton>
         </Stack>
      </Stack>
   )
}

export default Login