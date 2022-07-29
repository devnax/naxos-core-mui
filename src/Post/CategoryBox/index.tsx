import React, { Fragment, useMemo, useState } from 'react'
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
import { Props, CategoryType } from './types'
import Dropdown from '../../Dropdown';


type ChunkItem = CategoryType[]

const chunkArray = (items: CategoryType[], size: number): ChunkItem[] => {
   let chunked = []
   for (let i = 0; i < items.length; i += size) {
      chunked.push(items.slice(i, i + size))
   }
   return chunked
}


const Category = ({ defaultValue, categories, title, onChange, hideSearch, onCreate, perpage }: Props) => {
   const [state, setState] = useState<number[]>(defaultValue || [])
   const [searchText, setSearchText] = useState('')
   const [createText, setCreateText] = useState('')
   const [createParent, setCreateParent] = useState<number | null>()
   const [page, setPage] = useState<number>(1)

   const chunks = useMemo(() => chunkArray(categories.filter((cat) => !cat.parentId), perpage || 20), [categories])

   return (
      <MetaBox title={title} >
         <Scrollbar style={{ flex: 1, height: "auto", maxHeight: 200, padding: "0 8px" }}>
            <FormGroup>
               {
                  chunks[page - 1].map((category) => {
                     const isChecked = state.includes(category.id) || false

                     return <Fragment key={category.id}>
                        <FormControlLabel
                           control={<Checkbox
                              size="small"
                              sx={{ p: .4 }}
                              checked={isChecked}
                              onChange={() => {
                                 let cats = state || []
                                 if (isChecked) {
                                    const childs = categories.filter((c) => category.id === c.parentId).map((cat) => cat.id)
                                    cats = cats.filter((id) => !(childs.includes(id) || category.id == id))
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
                        {
                           isChecked && categories.filter((cat) => category.id === cat.parentId).map((subcat) => {
                              const isSubcatChecked = state.includes(subcat.id) || false
                              return (
                                 <FormControlLabel
                                    key={subcat.id}
                                    sx={{
                                       pl: 1.5
                                    }}
                                    control={<Checkbox
                                       size="small"
                                       sx={{ p: .4 }}
                                       checked={isSubcatChecked}
                                       onChange={() => {
                                          let cats = state || []
                                          if (isSubcatChecked) {
                                             cats.splice(cats.indexOf(subcat.id), 1)
                                          } else {
                                             cats.push(subcat.id)
                                          }
                                          setState([...cats])
                                          if (onChange) {
                                             onChange(cats)
                                          }
                                       }}
                                    />}
                                    label={subcat.name}
                                 />
                              )
                           })
                        }
                     </Fragment>
                  })
               }
            </FormGroup>
         </Scrollbar>
         <Box py={1}>
            <Stack alignItems="flex-end" pb={1}>
               {
                  chunks.length > 1 && <Pagination
                     color="primary"
                     count={chunks.length}
                     size="small"
                     hideNextButton
                     hidePrevButton
                     onChange={(_e: any, cpage: number) => {
                        setPage(cpage)
                     }}
                     sx={{
                        '& button': {
                           minWidth: 20,
                           height: 20,
                           fontSize: 13
                        }
                     }}
                  />
               }

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
                           paddingLeft: option.parentId ? 10 : 0,
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
               onCreate && <>
                  <TextField
                     value={createText}
                     fullWidth
                     size="small"
                     placeholder="Create"
                     onChange={(e: any) => {
                        setCreateText(e.target.value)
                     }}
                     onKeyDown={async (e: any) => {
                        if (e.keyCode === 13) {
                           const item = await onCreate({ name: createText, parentId: createParent as any })
                           if (item) {
                              setState([...state, item.id])
                           }
                           setCreateText('')
                           setCreateParent(null)
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
                              if (!cat.parentId) {
                                 items.push({
                                    title: cat.name,
                                    onClick: () => {
                                       setCreateParent(cat.id)
                                       Dropdown.hide()
                                    }
                                 })
                              }
                           }
                           Dropdown.show(e.target, items, { placement: "bottom-end" })
                        }}
                     >{createParent ? 'PARENT - ' + categories.find((c) => c.id === createParent)?.name : 'SELECT PARENT'}</Link>}
                  </Box>
               </>
            }

         </Box>
      </MetaBox>
   )
}

export default Category