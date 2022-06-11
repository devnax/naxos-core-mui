import React from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Scrollbar from '../../components/Scrollbar'
import { SystemVars } from '../../System'
import BlurBox from '../../BlurBox'
import DockIcon from './DockIcon'

const DockPanel = () => {
   const { location, pinnedApps, background } = SystemVars.get("Dock")
   const isHorigental = location === "bottom" || location === "top"

   return (
      <Box
         height={isHorigental ? 50 : "100%"}
         width={isHorigental ? "100%" : 50}
         bgcolor={background.backgroundColor || "background.paper"}
      >
         <BlurBox
            bgImage={background.backgroundImage}
            blur={background.blur}
         >
            <Stack
               justifyContent='space-between'
               alignItems="center"
               height={"100%"}
               width={"100%"}
            >
               <Scrollbar style={{ flex: 1, overflowX: 'hidden' }}>
                  <DockIcon />
               </Scrollbar>
               <Box>
                  Opt
               </Box>
            </Stack>
         </BlurBox>
      </Box>
   )
}

export default DockPanel