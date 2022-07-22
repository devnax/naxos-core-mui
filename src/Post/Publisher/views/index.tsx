import React, { FC, useState, useMemo } from 'react'
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
import { PublisherProps } from '../types'
import Handler from '../handler'
import { noDispatch, withMemo, withStore } from 'state-range'


const slugify = (str: string) =>
   str.toLowerCase()
      .trim()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');


const _Slug = () => {
   const [edit, setEdit] = useState(false)
   const state = Handler.getMeta("state")

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
}

const Slug = withMemo(_Slug, () => {
   const state = Handler.getMeta("state")
   return [state?.slug]
})


const Publisher: FC<PublisherProps> = (props) => {

   useMemo(() => {
      noDispatch(() => {
         Handler.loadProps({
            ...props,
            tabs: props.tabs ? [{ title: "General", content: <General /> }, ...props.tabs] : undefined
         })
      })
   }, [])

   const activeTab = Handler.getMeta("activeTab", "General")
   let tabs = Handler.getMeta("tabs")
   let slugEdited = Handler.getMeta("slugEdited")
   let hidePublish = Handler.getMeta("hidePublish")
   let metaBoxes = Handler.getMeta("metaBoxes")
   let onPublish = Handler.getMeta("onPublish")
   let onDraft = Handler.getMeta("onDraft")
   const state = Handler.getMeta("state")

   return (
      <Stack direction="row" gap={2}>
         <Stack flex={1} gap={2}>
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

                     value={activeTab}
                     onChange={(_e, t) => {
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
         <Stack spacing={2} width={350} px={2}>
            {
               !hidePublish && <MetaBox title="Publish" spacing={2}>
                  <Stack spacing={1}>
                     <Button
                        fullWidth
                        variant="contained"
                        onClick={() => onPublish && onPublish(state)}
                     >PUBLISH</Button>
                     <Button
                        fullWidth
                        variant="text"
                        disableRipple
                        onClick={() => onDraft && onDraft(state)}
                     >Save To Draft</Button>
                  </Stack>
               </MetaBox>
            }

            <Category />
            <Tags />

            {
               metaBoxes && metaBoxes.map((box) => {
                  if (box.sidebar) {
                     return <MetaBox key={"sidebar_metabox" + box.title} title={box.title} spacing={2}>
                        {box.content}
                     </MetaBox>
                  }
               })
            }
         </Stack>
      </Stack>
   )
}

export default withStore(Publisher)