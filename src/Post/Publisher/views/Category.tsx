import React from 'react'
import Box from '@mui/material/Box'
import MetaBox from '../../../MetaBox'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Scrollbar from '../../../Scrollbar'
import TextField from '@mui/material/TextField'
import { withStore } from 'state-range';
import { CompProps } from '../types'

const Category = ({ handler }: CompProps) => {

   const state = handler.getMeta("state")
   const categories = handler.getMeta("categories", [])

   if (!categories?.length) {
      return <></>
   }

   return (
      <MetaBox title="Category" >
         <Scrollbar style={{ flex: 1, height: "auto", maxHeight: 200, padding: "0 8px" }}>
            <FormGroup>
               {
                  categories.map((category) => {
                     return <FormControlLabel
                        key={"cat_list" + category.id}
                        control={<Checkbox
                           size="small"
                           sx={{ p: .5 }}
                           checked={state?.categories?.includes(category.id) || false}
                           onChange={(e: any) => {
                              const s = handler.getMeta("state")
                              let cats = s?.categories || []
                              if (cats.includes(category.id)) {
                                 cats.splice(cats.indexOf(category.id), 1)
                              } else {
                                 cats.push(category.id)
                              }
                              handler.setState({ categories: cats })
                           }}
                        />}
                        label={category.title}
                     />
                  })
               }
            </FormGroup>
         </Scrollbar>
         <Box py={1}>
            <TextField
               fullWidth
               size="small"
               placeholder='search..'
            />
         </Box>
      </MetaBox>
   )
}

export default withStore(Category, ({ handler }) => {
   const state = handler.getMeta("state")
   const categories = handler.getMeta("categories") || []
   return [(state?.categories || []).length, categories.length]
})