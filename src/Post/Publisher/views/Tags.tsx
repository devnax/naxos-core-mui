import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import MetaBox from '../../../MetaBox'
import { withStore } from 'state-range';
import Handler from '../handler'

const Tags = () => {
   const [newTag, setNewTag] = React.useState('')
   const state = Handler.getMeta("state")
   const tags = Handler.getMeta("tags", [])

   if (!tags?.length) {
      return <></>
   }

   return (
      <MetaBox title="Tags" >
         <Autocomplete
            multiple
            limitTags={3}
            options={tags}
            getOptionLabel={(option) => option.title}
            loading
            value={state?.tags as any || []}
            onChange={(_e: any, items: any) => {
               Handler.setState({
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
                  const s = Handler.getMeta("state")
                  const t = s?.tags || []
                  const item = { id: Math.random(), title: newTag }
                  Handler.setMeta("tags", [
                     ...Handler.getMeta("tags") || [],
                     item
                  ])
                  Handler.setState({
                     tags: [
                        item,
                        ...t
                     ]
                  })
                  setNewTag('')
               }
            }}
         />
      </MetaBox>
   );
}

export default withStore(Tags, () => {
   const state = Handler.getMeta("state")
   const tags = Handler.getMeta("tags") || []

   return [(state?.tags || []).length, tags.length]
})
