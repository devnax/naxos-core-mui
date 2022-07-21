import React from 'react'
import TextField from '@mui/material/TextField'
import MetaBox from '../../../components/MetaBox'

const General = () => {
   return (
      <MetaBox title="Sort Content">
         <TextField
            fullWidth
            multiline
            minRows={2}
         />
      </MetaBox>
   )
}

export default General