import React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import AccessAlarmRoundedIcon from '@mui/icons-material/AccessAlarmRounded';
import Scrollbar from 'react-browser-scrollbar'
import { withStore } from 'state-range'
import { ItemProps } from '../types'
import { Row } from 'state-range/src/types'
import Handler from '../Handler'
import Typography from '@mui/material/Typography'
import isMobile from '../isMobile'



interface ListItemViewProps {
   active: boolean;
   item: Row<ItemProps>;
   id: string;
   index: number;
}

const _ListItemView = ({ item, id, active, index }: ListItemViewProps) => {
   const _isMobile = isMobile()
   return (
      <>
         {item.sectionTitle && <Typography
            mt={index > 1 ? 3.5 : 0}
            mb={1}
            variant="subtitle1"
            fontSize={14}
            fontWeight={600}
            sx={{ opacity: .7 }}
         >{item.sectionTitle}</Typography>}
         <ListItemButton
            selected={active}
            sx={{ borderRadius: 1 }}
            onClick={() => {
               if (_isMobile) {
                  Handler.mobileSidebarShow(false)
               }
               Handler.renderView(id, item._id)
            }}
         >

            {
               item.icon && <ListItemIcon>
                  <AccessAlarmRoundedIcon />
               </ListItemIcon>
            }

            <ListItemText>
               <Typography variant="body1" fontSize={15} fontWeight={500}>{item.title}</Typography>
               {
                  item.subtitle && <Typography variant="subtitle2" fontSize={13} fontWeight={500} sx={{ opacity: .7 }} >{item.subtitle}</Typography>
               }
            </ListItemText>
         </ListItemButton>
      </>
   )
}


const ListItemView = withStore(_ListItemView, ({ item }) => [item.observe])


const ListView = ({ id }: { id: string }) => {
   const items = Handler.find({ viewId: id })
   const activeItem = Handler.getView(id)

   return (
      <Box px={1}>
         <Scrollbar>
            <List dense>
               {
                  items.map((item, index: number) => <ListItemView
                     key={item._id}
                     active={item._id === activeItem?._id}
                     item={item}
                     id={id}
                     index={index}
                  />
                  )
               }

            </List>
         </Scrollbar>
      </Box>
   )
}

export default withStore(ListView, ({ id }) => {
   const items = Handler.find({ viewId: id })
   const activeItem = Handler.getView(id)
   return [activeItem?.observe, items.length]
})