import React, { useMemo } from 'react'
import Box from '@mui/material/Box'
import MetaBox from '../../../MetaBox'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Scrollbar from '../../../Scrollbar'
import TextField from '@mui/material/TextField'
import { CompProps } from '../types'
import { Autocomplete, Pagination, Stack } from '@mui/material';

const Category = ({ state, updateState, props }: CompProps) => {
   const { categories, tags } = props

   if (!categories?.length) {
      return <></>
   }

   return useMemo(() => (<MetaBox title="Category" >
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
                           let cats = state?.categories || []
                           if (cats.includes(category.id)) {
                              cats.splice(cats.indexOf(category.id), 1)
                           } else {
                              cats.push(category.id)
                           }
                           updateState({ categories: cats })
                        }}
                     />}
                     label={category.title}
                  />
               })
            }
         </FormGroup>
      </Scrollbar>
      <Box py={1}>
         <Stack alignItems="flex-end" pb={1}>
            <Pagination
               color="primary"
               count={4}
               size="small"
               hideNextButton
               hidePrevButton
               sx={{
                  '& button': {
                     minWidth: 20,
                     height: 20,
                     fontSize: 13
                  }
               }}
            />
         </Stack>
         <Autocomplete
            multiple
            limitTags={3}
            options={tags || []}
            getOptionLabel={(option) => option.title}
            loading
            value={state?.tags as any || []}
            onChange={(_e: any, items: any) => {
               updateState({
                  tags: items
               })
            }}
            renderInput={(params) => (
               <TextField {...params} placeholder="Add tags" size='small' />
            )}
            sx={{ width: '100%', mb: 2 }}
         />
      </Box>
   </MetaBox>),
      [state.categories?.length])
}

export default Category