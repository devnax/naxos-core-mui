import React from 'react'
import TextField from '../../../Form/TextField'

import Thumbnail from '../../ThumbnailBox'
import Excerpt from './Excerpt'
import MetaBox from '../../../MetaBox'
import Category from '../../CategoryBox'
import Tags from '../../TagsBox'
import { CompProps } from '../types'

import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'


const General = ({ form, props }: CompProps) => {
   const { hideThumbnail, hideExcerpt, editor, metaBoxes } = props

   return (
      <Grid container>
         <Grid item xs={12} md={7} lg={7.5}>
            <Stack spacing={1.5}>
               {
                  editor || <TextField
                     name="content"
                     form={form}
                     fullWidth
                     multiline
                     minRows={10}
                  />
               }

               {
                  !hideExcerpt && <Excerpt
                     form={form}
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
                  title="Category"
                  categories={props.categories || []}
               />
               <Tags
                  form={form}
                  name="tags"
                  options={props.tags || []}
               />
               {
                  !hideThumbnail && <Thumbnail
                     form={form}
                     name="thumbnail"
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