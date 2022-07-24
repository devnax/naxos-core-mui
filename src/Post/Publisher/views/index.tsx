import React, { FC, useState, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import General from './General'

import IconButton from '@mui/material/IconButton'
import EditSlugIcon from '@mui/icons-material/ModeEditOutlineRounded';
import { PublisherProps } from '../types'
import Handler from '../handler'
import { withMemo, withStore } from 'state-range'
import Loader from '../../../Loader'
import Typography from '@mui/material/Typography'


const slugify = (str: string) =>
   str.toLowerCase()
      .trim()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');


const Slug = withMemo(() => {
   const [edit, setEdit] = useState(false)
   const state = Handler.getMeta("state")
   if (!state?.slug && !edit) {
      return <></>
   }
   return (
      <Stack direction="row" spacing={1} alignItems="center" mt={.3}>
         {
            edit ? <TextField
               value={state?.slug || ""}
               onChange={(e: any) => {
                  Handler.setState({ slug: slugify(e.target.value) })
               }}
               fullWidth
               variant="standard"
               size="small"
               autoFocus
               spellCheck={false}
               inputProps={{
                  sx: { p: .3 }
               }}
               onKeyDown={(e: any) => {
                  if (e.keyCode === 13) {
                     setEdit(false)
                     Handler.setMeta("slugEdited", true)
                  }
               }}
               onBlur={() => {
                  setEdit(false)
                  Handler.setMeta("slugEdited", true)
               }}
            /> : <>
               <Link href="#">{state?.slug}</Link>
               <IconButton size="small" onClick={() => {
                  setEdit(true)
               }}>
                  <EditSlugIcon sx={{ fontSize: 13 }} />
               </IconButton>
            </>
         }
      </Stack>
   )
}, () => [Handler.getMeta("state")?.slug])


const Publisher: FC<PublisherProps> = (props) => {
   useEffect(() => {
      Handler.loadProps({
         ...props,
         tabs: props.tabs ? [{ title: "General", content: <General /> }, ...props.tabs] : undefined
      })
   }, [])

   const activeTab = Handler.getMeta("activeTab", "General")
   const tabs = Handler.getMeta("tabs")
   const slugEdited = Handler.getMeta("slugEdited")
   const onTabChange = Handler.getMeta("onTabChange")
   const loading = Handler.getMeta("loading", false)
   const state = Handler.getMeta("state")
   const hidePublish = Handler.getMeta("hidePublish")
   const onPublish = Handler.getMeta("onPublish")
   const onDraft = Handler.getMeta("onDraft")
   const editMode = Handler.getMeta("editMode", false)
   const title = Handler.getMeta("title")
   const containerProps = Handler.getMeta("containerProps", {})

   return (
      <Loader loading={loading as any}>
         {
            !hidePublish && <Stack
               spacing={1}
               direction="row"
               justifyContent="space-between"
               mb={2}
               position="sticky"
               top={0}
               zIndex={1}
               bgcolor="background.paper"
               p={1}
            >
               <Box>
                  {
                     title && <Typography sx={{ userSelect: 'none', opacity: .7 }} variant="h4" >{title}</Typography>
                  }
               </Box>
               <Stack direction="row" gap={2} alignItems="center">
                  <Button
                     variant="text"
                     onClick={() => onDraft && onDraft(state as any)}
                  >Save To Draft</Button>
                  <Button
                     variant="contained"
                     onClick={() => onPublish && onPublish(state as any)}
                  >
                     {editMode ? "UPDATE" : "PUBLISH"}
                  </Button>
               </Stack>
            </Stack>
         }
         <Stack flex={1} gap={2} {...containerProps}>
            <Box>
               <TextField
                  value={state?.title || ""}
                  onChange={(e: any) => {
                     Handler.setState({
                        title: e.target.value,
                        slug: !slugEdited ? slugify(e.target.value) : state?.slug
                     })
                  }}
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
               {
                  tabs && <Tabs sx={{ mt: 1 }}
                     variant="scrollable"
                     scrollButtons="auto"
                     value={activeTab}
                     onChange={(_e, t) => {
                        onTabChange && onTabChange(t)
                        Handler.setMeta("activeTab", t)
                     }}
                  >
                     {
                        tabs.map((tab) => {
                           return <Tab key={tab.title} label={tab.title} value={tab.title} sx={{ p: 0, fontWeight: 500 }} />
                        })
                     }
                  </Tabs>
               }
            </Box>
            <Box>
               {!tabs && <General />}
               {
                  tabs && tabs.map((tab) => {
                     if (tab.title === activeTab) {
                        return <div key={tab.title + "_view"}>{tab.content}</div>
                     }
                  })
               }
            </Box>
         </Stack>
      </Loader>
   )
}

export default withStore(Publisher, () => {
   return [Handler.observeStoreMeta()]
})