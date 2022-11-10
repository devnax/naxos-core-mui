import React from 'react'
import Stack from '@mui/material/Stack'
import InputBox from './InputBox'
import Card from './AuthCard'

const Login = () => {
   return (
      <Stack
         spacing={2}
         width={300}
         p={3}
      >
         <Card />
         <InputBox />
      </Stack>
   )
}

export default Login