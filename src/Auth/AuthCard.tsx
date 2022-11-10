import React from 'react'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

const Card = () => {
   return (
      <Stack
         spacing={2}
         alignItems="center"
      >
         <Avatar
            src="https://mui.com/static/images/avatar/2.jpg"
            sx={{
               width: 70,
               height: 70,
            }}
         />
         <Typography variant="h3" fontSize={17} >Log in</Typography>
      </Stack>
   )
}

export default Card