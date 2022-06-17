import * as React from 'react'
import Box from "@mui/material/Box";
import { ListViewProps, ListItemStoreProps, ID } from '../types'
import { withMemo, withStore } from 'state-range';
import Handler from '../Handler'

import Typography from '@mui/material/Typography'
import List, { ListProps } from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'


interface ItemRenderProps extends ListItemStoreProps {
   active?: ID;
   button?: boolean
}

const ItemRender = withMemo((props: ItemRenderProps) => {
   const { button, active, id, icon, title, label, heading } = props
   const btn: any = button === undefined || button ? true : false

   return (
      <>
         {
            typeof heading === 'string' ? <Typography variant="h6" fontWeight={500} sx={{ opacity: .5 }} mt={1} mb={.6}>{heading}</Typography> : heading
         }
         <ListItem
            button={btn}
            sx={{ borderRadius: 1, p: .4, px: 1 }}
            selected={active === id}
         >
            {icon && <ListItemIcon sx={{ minWidth: 35 }}>{icon}</ListItemIcon>}
            <ListItemText>
               <Typography variant="body1" fontSize={15} fontWeight={500}>
                  {title}
               </Typography>
            </ListItemText>
         </ListItem>
      </>
   )
}, ({ observe }: any) => [observe])

interface ListPropsTypes extends ListProps {
   listId: ID;
   active?: ID;
   dept: number;
   items: ListItemStoreProps[];
   button?: boolean;
}

const ListRender = ({ button, active, dept, listId, items, ...listProps }: ListPropsTypes) => {

   return <List dense {...listProps} sx={{ ml: dept, ...(listProps?.sx || {}) }}>
      {
         items.map((item) => {
            const childs = Handler.getChilds(listId, item.id)

            return <Box key={item._id}>
               <ItemRender active={active} {...item} />
               {childs.length ? <ListRender button={button} active={active} dept={dept + 1} listId={listId} items={childs} {...listProps} /> : ""}
            </Box>
         })
      }
   </List>
}

const ListView = ({ active, listId, ...ListProps }: ListViewProps) => {

   const listItems = Handler.getItems(listId)
   if (!listItems.length) {
      return <></>
   }

   return (
      <Box>
         <ListRender active={active} dept={0} listId={listId} items={listItems} {...ListProps} />
      </Box>
   )
}

export default withStore(ListView)