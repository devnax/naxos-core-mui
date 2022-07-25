import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import MetaBox from '../../../MetaBox'
import { CompProps } from '../types';

const Tags = ({ state, updateState, props }: CompProps) => {
   const [newTag, setNewTag] = React.useState('')
   const { tags } = props

   if (!tags?.length) {
      return <></>
   }

   return React.useMemo(() => (<MetaBox title="Tags" >
      <Autocomplete
         multiple
         limitTags={3}
         options={tags}
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
      <TextField
         size="small"
         fullWidth
         placeholder='Create New'
         value={newTag}
         onChange={(e: any) => {
            setNewTag(e.target.value)
         }}
         onKeyDown={(e: any) => {
            if (newTag.trim() && e.key === 'Enter') {
               const t = state?.tags || []
               const item = { id: Math.random(), title: newTag }
               updateState({
                  tags: [
                     item,
                     ...t
                  ]
               })
               setNewTag('')
            }
         }}
      />
   </MetaBox>), [state.tags?.length, newTag])
}

export default Tags
