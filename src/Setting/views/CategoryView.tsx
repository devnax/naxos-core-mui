import Stack from '@mui/material/Stack'
import React from 'react'
import { AnimatePresence } from "framer-motion"
import Sidebar from './SettingList'
import Preview from './Preview'

const SingleView = () => {
   
   return (
      <AnimatePresence exitBeforeEnter>
         <Stack sx={{
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            display: 'flex'
         }}>
            <Sidebar />
            <Preview />
         </Stack>
      </AnimatePresence>
   )
}

export default SingleView