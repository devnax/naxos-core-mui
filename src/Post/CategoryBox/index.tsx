import React, { useState } from 'react'
import Box from '@mui/material/Box'
import MetaBox from '../../MetaBox'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Scrollbar from '../../Scrollbar'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { Props } from './types'
import Dropdown from '../../Dropdown';


const Category = ({ defaultValue, categories, title, onChange, hideSearch, hideCreate, separate }: Props) => {
   const [state, setState] = useState<number[]>(defaultValue || [])
   const [searchText, setSearchText] = useState('')
   const [createText, setCreateText] = useState('')
   const [createParent, setCreateParent] = useState<string>()

   return (
      <MetaBox title={title} >
         <Scrollbar style={{ flex: 1, height: "auto", maxHeight: 200, padding: "0 8px" }}>
            <FormGroup>
               {
                  categories.map((category) => {
                     return <FormControlLabel
                        key={"cat_list" + category.id}
                        sx={{
                           pl: category.subcat ? 1.5 : 0
                        }}
                        control={<Checkbox
                           size="small"
                           sx={{ p: .4 }}
                           checked={state.includes(category.id) || false}
                           onChange={() => {
                              let cats = state || []
                              if (state.includes(category.id)) {
                                 cats.splice(cats.indexOf(category.id), 1)
                              } else {
                                 cats.push(category.id)
                              }
                              setState([...cats])
                              if (onChange) {
                                 onChange(cats)
                              }
                           }}
                        />}
                        label={category.name}
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
            {
               hideSearch !== false && <Autocomplete
                  multiple
                  inputValue={searchText}
                  onInputChange={(_e: any, val, resone) => {
                     if (resone === 'input') {
                        setSearchText(val)
                     }
                  }}
                  disableCloseOnSelect
                  options={categories || []}
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option, { selected }) => (
                     <li
                        {...props}
                        style={{
                           padding: 0,
                           paddingLeft: option.subcat ? 10 : 0,
                        }}
                     >
                        <Checkbox
                           size="small"
                           sx={{ p: .4 }}
                           style={{ marginRight: 8 }}
                           checked={state.includes(option.id)}
                        />
                        {option.name}
                     </li>
                  )}
                  value={[]}
                  onChange={(_e: any, items: any) => {
                     let cats = state || []
                     if (state.includes(items[0].id)) {
                        cats.splice(cats.indexOf(items[0].id), 1)
                     } else {
                        cats.push(items[0].id)
                     }
                     setState([...cats])
                     if (onChange) {
                        onChange(cats)
                     }
                  }}
                  renderInput={(params) => (
                     <TextField {...params}
                        placeholder="Search..."
                        size='small'
                     />
                  )}
                  sx={{ width: '100%', mb: 2 }}
               />
            }

            {
               hideCreate !== false && <>
                  <TextField
                     value={createText}
                     fullWidth
                     size="small"
                     placeholder="Create"
                     onChange={(e: any) => {
                        setCreateText(e.target.value)
                     }}
                     onKeyDown={(e: any) => {
                        if (e.keyCode === 13) {
                           const id = Math.random()
                           categories.push({ id, name: createText })
                           setCreateText('')
                           setState([...state, id])
                        }
                     }}
                  />
                  <Box sx={{ textAlign: "right" }}>
                     {createText && <Link
                        sx={{
                           cursor: "pointer",
                        }}
                        onClick={(e: any) => {
                           const items = []
                           for (let cat of categories) {
                              if (!cat.subcat) {
                                 items.push({
                                    title: cat.name,
                                    onClick: () => {
                                       setCreateParent(cat.name)
                                       Dropdown.hide()
                                    }
                                 })
                              }
                           }
                           Dropdown.show(e.target, items, { placement: "bottom-end" })
                        }}
                     >{createParent ? 'PARENT - ' + createParent : 'SELECT PARENT'}</Link>}
                  </Box>
               </>
            }

         </Box>
      </MetaBox>
   )
}

export default Category