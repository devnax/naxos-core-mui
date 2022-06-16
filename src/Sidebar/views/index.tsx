import * as React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Scrollbar from '../../components/Scrollbar'
import { SidebarProps } from './types'

const Sidebar: React.FC<SidebarProps> = ({ header, footer, children, ...props }) => {
   return (
      <Stack
         maxWidth={270}
         bgcolor="background.default"
         height="100%"
         {...props}

      >
         {header && <Box>{header}</Box>}
         <Scrollbar style={{
            height: '100%',
            flex: 1
         }}>
            {children}
         </Scrollbar>
         {footer && <Box>{footer}</Box>}
      </Stack>
   )
}

export default Sidebar