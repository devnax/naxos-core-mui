import * as React from 'react'
import Box from "@mui/material/Box";
import { ListViewProps, ListItemStoreProps, ID } from '../types'
import { withMemo, withStore } from 'state-range';
import Handler from '../Handler'

import Typography from '@mui/material/Typography'
import List, { ListProps } from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'


interface ItemRenderProps extends ListItemStoreProps {
   active?: ID;
}

const ItemRender = withMemo(({ active, id, icon, title }: ItemRenderProps) => {

   return (
      <ListItemButton
         sx={{ borderRadius: 1 }}
         selected={active === id}
      >
         {icon && <ListItemIcon>{icon}</ListItemIcon>}
         <ListItemText>
            <Typography variant="body1" fontSize={15} fontWeight={500}>
               {title}
            </Typography>
         </ListItemText>
      </ListItemButton>
   )
}, ({ observe }: any) => observe)

interface ListPropsTypes extends ListProps {
   listId: ID;
   active?: ID;
   dept: number;
   items: ListItemStoreProps[]
}

const ListRender = ({ active, dept, listId, items, ...listProps }: ListPropsTypes) => {
   return <List dense {...listProps} sx={{ ml: dept }}>
      {
         items.map((item) => {
            const childs = Handler.getChilds(listId, item.id)

            return <Box>
               <ItemRender active={active} {...item} key={item._id} />
               {childs.length ? <ListRender active={active} dept={dept + 1} listId={listId} items={childs} {...listProps} /> : ""}
            </Box>
         })
      }
   </List>
}

const ListView = ({ active, id, ...ListProps }: ListViewProps) => {

   const listItems = Handler.getItems(id)
   if (!listItems.length) {
      return <></>
   }

   return (
      <Box>
         <ListRender active={active} dept={0} listId={id} items={listItems} {...ListProps} />
      </Box>
   )
}

export default withStore(ListView)