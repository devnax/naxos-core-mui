import React, { useState } from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'

import General from './General'
import MetaBox from '../../../components/MetaBox'
import Category from './Category'
import Tags from './Tags'
import IconButton from '@mui/material/IconButton'
import EditSlugIcon from '@mui/icons-material/ModeEditOutlineRounded';


const Slug = () => {
   const [edit, setEdit] = useState(false)

   return (
      <Stack direction="row" spacing={1} alignItems="center" mt={.3}>
         {
            edit ? <TextField
               fullWidth
               variant="standard"
               size="small"
               autoFocus
               value="course/ielts-3-full-mock-test"
               spellCheck={false}
               inputProps={{
                  sx: { p: .3 }
               }}
               onKeyDown={(e: any) => {
                  if (e.keyCode === 13) {
                     setEdit(false)
                  }
               }}
            /> : <>
               <Link href="#">course/ielts-3-full-mock-test</Link>
               <IconButton size="small" onClick={() => {
                  setEdit(true)
               }}>
                  <EditSlugIcon sx={{ fontSize: 13 }} />
               </IconButton>
            </>
         }
      </Stack>
   )
}


const PostView = () => {
   return (
      <Stack direction="row" gap={2}>
         <Stack flex={1} gap={2}>
            <Box>
               <TextField
                  fullWidth
                  inputProps={{
                     sx: {
                        fontSize: 30,
                        fontWeight: 600,
                        p: .5,
                        px: 1
                     }
                  }}
                  placeholder="Enter title"
               />
               <Slug />
               <Tabs sx={{ mt: 1 }} value="General">
                  <Tab label="General" value="General" sx={{ p: 0, fontWeight: 500 }} />
                  <Tab label="Content" value="Content" sx={{ p: 0, fontWeight: 500 }} />
                  <Tab label="Setting" value="Setting" sx={{ p: 0, fontWeight: 500 }} />
               </Tabs>
            </Box>
            <General />
         </Stack>
         <Stack spacing={2} width={350} px={2}>
            <MetaBox title="Publish" spacing={2}>
               <Stack spacing={1}>
                  <Button fullWidth variant="contained">PUBLISH</Button>
                  <Button fullWidth variant="text" disableRipple>Save To Draft</Button>
               </Stack>
            </MetaBox>
            <Category />
            <Tags />
         </Stack>
      </Stack>
   )
}

export default PostView