import React from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Sidebar from './views/Sidebar'
import Content from './views/Content'
import Scrollbar from 'react-browser-scrollbar'

const ListView = () => {
   return (
      <Stack direction="row" >
         <Box width={250} bgcolor="background.paper">
            <Sidebar />
         </Box>
         <Box flex={1} >
            <Scrollbar>
               <Content />
            </Scrollbar>
         </Box>
      </Stack>
   )
}

export default ListView