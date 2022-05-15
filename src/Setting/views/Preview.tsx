import React from 'react'
import Box from '@mui/material/Box'
import {withStore} from 'state-range'
import Setting from '../Handler'

const Preview = () => {
   let preview     = Setting.preview()
   
   return (
      <Box 
         sx={{
            height: '100%',
            flex: '1 1 600px',
            p: 2
         }}>
            {preview?.render}
      </Box>
   )
}

export default withStore(Preview)