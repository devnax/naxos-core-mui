import React from 'react'
import TextField from '@mui/material/TextField'
import Thumbnail from './Thumbnail'
import Excerpt from './Excerpt'
import MetaBox from '../../../MetaBox'
import Category from './Category'
import Tags from './Tags'
import { CompProps } from '../types'

import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'


const General = ({ state, updateState, props }: CompProps) => {
   const { hideThumbnail, hideExcerpt, editor, metaBoxes } = props

   return (
      <Grid container>
         <Grid item xs={12} md={7} lg={7.5}>
            <Stack spacing={1.5}>
               {
                  editor || <TextField
                     value={state?.content || ""}
                     onChange={(e: any) => {
                        updateState({ content: e.target.value })
                     }}
                     fullWidth
                     multiline
                     minRows={10}
                  />
               }

               {
                  !hideExcerpt && <Excerpt
                     state={state}
                     updateState={updateState}
                     props={props}
                  />
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
               <Category
                  state={state}
                  updateState={updateState}
                  props={props}
               />
               <Tags
                  state={state}
                  updateState={updateState}
                  props={props}
               />

               {
                  !hideThumbnail && <Thumbnail
                     state={state}
                     updateState={updateState}
                     props={props}
                  />
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

export default General