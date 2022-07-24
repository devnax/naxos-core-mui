import React from 'react'
import TextField from '@mui/material/TextField'
import Thumbnail from './Thumbnail'
import Excerpt from './Excerpt'
import { withStore } from 'state-range'
import MetaBox from '../../../MetaBox'
import Category from './Category'
import Tags from './Tags'
import { CompProps } from '../types'

import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'


const General = ({ handler }: CompProps) => {
   const state = handler.getMeta("state")
   const hideThumbnail = handler.getMeta("hideThumbnail")
   const hideExcerpt = handler.getMeta("hideExcerpt")
   const editor = handler.getMeta("editor")
   let metaBoxes = handler.getMeta("metaBoxes")

   return (
      <Grid container>
         <Grid item xs={12} md={7} lg={7.5}>
            <Stack spacing={1.5}>
               {
                  editor || <TextField
                     value={state?.content || ""}
                     onChange={(e: any) => {
                        handler.setState({ content: e.target.value })
                     }}
                     fullWidth
                     multiline
                     minRows={10}
                  />
               }

               {
                  !hideExcerpt && <Excerpt handler={handler} />
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
         </Grid>
         <Grid item xs={12} md={5} lg={4.5} px={2}>
            <Stack spacing={1.5}>
               <Category handler={handler} />
               <Tags handler={handler} />

               {
                  !hideThumbnail && <Thumbnail handler={handler} />
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
         </Grid>
      </Grid>
   )
}

export default withStore(General, ({ handler }) => {
   const state = handler.getMeta("state")
   const hideThumbnail = handler.getMeta("hideThumbnail")
   const hideExcerpt = handler.getMeta("hideExcerpt")
   return [state?.content, hideThumbnail, hideExcerpt]
})