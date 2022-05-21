import React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import AccessAlarmRoundedIcon from '@mui/icons-material/AccessAlarmRounded';
import Scrollbar from 'react-browser-scrollbar'

const Sidebar = () => {
   return (
      <Box p={1}>
         <Scrollbar>
            <List dense>
               <ListItemButton sx={{ borderRadius: 1 }}>
                  <ListItemIcon>
                     <AccessAlarmRoundedIcon />
                  </ListItemIcon>
                  <ListItemText>
                     General
                  </ListItemText>
               </ListItemButton>
            </List>
         </Scrollbar>
      </Box>
   )
}

export default Sidebar