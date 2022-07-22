import React from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Thumbnail from './Thumbnail'
import Excerpt from './Excerpt'
import Handler from '../handler'
import { withStore } from 'state-range'


const General = () => {
   const state = Handler.getMeta("state")
   const hideThumbnail = Handler.getMeta("hideThumbnail")
   const hideExcerpt = Handler.getMeta("hideExcerpt")

   return (
      <Stack spacing={2}>
         <TextField
            value={state?.content || ""}
            onChange={(e: any) => {
               Handler.setState({ content: e.target.value })
            }}
            fullWidth
            multiline
            minRows={10}
         />
         {
            !hideThumbnail && <Thumbnail />
         }
         {
            !hideExcerpt && <Excerpt />
         }
      </Stack>
   )
}

export default withStore(General, () => {
   const state = Handler.getMeta("state")
   const hideThumbnail = Handler.getMeta("hideThumbnail")
   const hideExcerpt = Handler.getMeta("hideExcerpt")
   return [state?.content, hideThumbnail, hideExcerpt]
})