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
import { CompProps } from '../types'
import { withMemo, withStore } from 'state-range'
import Loader from '../../../Loader'
import Typography from '@mui/material/Typography'


const slugify = (str: string) =>
   str.toLowerCase()
      .trim()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');


const Slug = withMemo(({ handler }: CompProps) => {
   const [edit, setEdit] = useState(false)
   const state = handler.getMeta("state")
   if (!state?.slug && !edit) {
      return <></>
   }
   return (
      <Stack direction="row" spacing={1} alignItems="center" mt={.3}>
         {
            edit ? <TextField
               value={state?.slug || ""}
               onChange={(e: any) => {
                  handler.setState({ slug: slugify(e.target.value) })
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
                     handler.setMeta("slugEdited", true)
                  }
               }}
               onBlur={() => {
                  setEdit(false)
                  handler.setMeta("slugEdited", true)
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
}, ({ handler }) => [handler.getMeta("state")?.slug])


const Publisher: FC<CompProps> = ({ handler, containerProps, ...stackPtops }) => {
   useEffect(() => {
      const tabs = handler.getMeta("tabs")
      if (tabs) {
         handler.setMeta('tabs', [{ title: "General", content: <General handler={handler} /> }, ...tabs])
      }
      return () => {
         handler.deleteAllMeta()
      }
   }, [])

   const activeTab = handler.getMeta("activeTab", "General")
   const tabs = handler.getMeta("tabs")
   const slugEdited = handler.getMeta("slugEdited")
   const onTabChange = handler.getMeta("onTabChange")
   const loading = handler.getMeta("loading", false)
   const state = handler.getMeta("state")
   const hidePublish = handler.getMeta("hidePublish")
   const onPublish = handler.getMeta("onPublish")
   const onDraft = handler.getMeta("onDraft")
   const editMode = handler.getMeta("editMode", false)
   const title = handler.getMeta("title")

   return (
      <Loader loading={loading as any} {...stackPtops}>
         {
            !hidePublish && <Stack
               spacing={1}
               direction="row"
               justifyContent="space-between"
               mb={2}
               position="sticky"
               top={0}
               zIndex={1}
               bgcolor="background.default"
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
                     handler.setState({
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
               <Slug handler={handler} />
               {
                  tabs && <Tabs sx={{ mt: 1 }}
                     variant="scrollable"
                     scrollButtons="auto"
                     value={activeTab}
                     onChange={(_e, t) => {
                        onTabChange && onTabChange(t)
                        handler.setMeta("activeTab", t)
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
               {!tabs && <General handler={handler} />}
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

export default withStore(Publisher, ({ handler }) => {
   return [handler.observeStoreMeta()]
})