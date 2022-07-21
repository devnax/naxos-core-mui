import React from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Thumbnail from './Thumbnail'
import Excerpt from './Excerpt'

const General = () => {
   return (
      <Stack spacing={2}>
         <TextField
            fullWidth
            multiline
            minRows={10}
         />

         <Thumbnail />
         <Excerpt />
      </Stack>
   )
}

export default General