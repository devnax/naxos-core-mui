import React from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import ListItemsView from './views/ListItemsView'
import ContentView from './views/ContentView'
import Scrollbar from 'react-browser-scrollbar'
import Handler, { PublicHandler } from './Handler'
import Typography from '@mui/material/Typography'
import isMobile from './isMobile'
import { withStore } from 'state-range'

export default PublicHandler
export { ListItemsView, ContentView }


interface Props {
   id: string;
   sidebarTitle?: string;
}




export const ListViewMobileTemplate = withStore(({ id, sidebarTitle }: Props) => {
   const isMobileSidebarShow = Handler.mobileSidebarShow()
   return (
      <Stack direction={"column"} >
         {
            isMobileSidebarShow ? <Box width={"100%"} bgcolor="background.paper">
               {sidebarTitle && <Typography p={2} variant="h5" >{sidebarTitle}</Typography>}
               <ListItemsView id={id} />
            </Box> : <Box flex={1} >
               <Scrollbar>
                  <ContentView id={id} />
               </Scrollbar>
            </Box>
         }
      </Stack>
   )
})


export const ListViewLargTemplate = withStore(({ id, sidebarTitle }: Props) => {

   return (
      <Stack direction={"row"} >
         <Box width={300} bgcolor="background.paper">
            {sidebarTitle && <Typography p={2} variant="h5" >{sidebarTitle}</Typography>}
            <ListItemsView id={id} />
         </Box>
         <Box flex={1} >
            <Scrollbar>
               <ContentView id={id} />
            </Scrollbar>
         </Box>
      </Stack>
   )
})

export const ListViewTemplate = (props: Props) => {
   const _ismobile = isMobile()

   return _ismobile ? <ListViewMobileTemplate {...props} /> : <ListViewLargTemplate {...props} />
}