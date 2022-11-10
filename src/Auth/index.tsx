import React from 'react'
import Stack from '@mui/material/Stack'
import Login from './Login'
// import Card from './components/Card'
const Auth = () => {
   return (
      <Stack
         height="100%"
         width="100%"
         alignItems="center"
         justifyContent="center"
      >

         {/* <Card /> */}
         <Login />
      </Stack>
   )
}

export default Auth