import React, { FC } from 'react'
import Sidebar, { SidebarProps } from '../Sidebar'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import DrawerHandler from './Handler'

export type DrawerProps = SidebarProps & {}

const DrawerView: FC<DrawerProps> = ({ children, ...props }) => {
   return (
      <Stack direction="row" height="100%">
         <Sidebar
            bgcolor="background.paper"
            {...props}
         >
            {children}
         </Sidebar>
         <Box
            height="100%"
            flex={1}
            onClick={() => DrawerHandler.close()}>
         </Box>
      </Stack>
   )
}

export default DrawerView