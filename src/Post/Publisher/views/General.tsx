import React from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Thumbnail from './Thumbnail'
import Excerpt from './Excerpt'
import Handler from '../handler'
import { withStore } from 'state-range'
import MetaBox from '../../../MetaBox'
import Category from './Category'
import Tags from './Tags'

const General = () => {
   const state = Handler.getMeta("state")
   const hideThumbnail = Handler.getMeta("hideThumbnail")
   const hideExcerpt = Handler.getMeta("hideExcerpt")
   const editor = Handler.getMeta("editor")
   let metaBoxes = Handler.getMeta("metaBoxes")

   return (
      <Stack direction="row">
         <Stack spacing={2} flex={1}>
            {
               editor || <TextField
                  value={state?.content || ""}
                  onChange={(e: any) => {
                     Handler.setState({ content: e.target.value })
                  }}
                  fullWidth
                  multiline
                  minRows={10}
               />
            }

            {
               !hideExcerpt && <Excerpt />
            }
            {
               metaBoxes && metaBoxes.map((box) => {
                  if (!box.sidebar) {
                     return <MetaBox key={"container_metabox" + box.title} title={box.title}>
                        {box.content}
                     </MetaBox>
                  }
               })
            }
         </Stack>

         <Stack spacing={2} width={350} px={2}>
            <Category />
            <Tags />

            {
               !hideThumbnail && <Thumbnail />
            }

            {
               metaBoxes && metaBoxes.map((box) => {
                  if (box.sidebar) {
                     return <MetaBox key={"sidebar_metabox" + box.title} title={box.title} >
                        {box.content}
                     </MetaBox>
                  }
               })
            }
         </Stack>
      </Stack>
   )
}

export default withStore(General, () => {
   const state = Handler.getMeta("state")
   const hideThumbnail = Handler.getMeta("hideThumbnail")
   const hideExcerpt = Handler.getMeta("hideExcerpt")
   return [state?.content, hideThumbnail, hideExcerpt]
})