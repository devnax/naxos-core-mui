import React, { useState, Component, useMemo } from 'react'
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
import { CompProps, PublisherProps, State } from '../types'
import Loader from '../../../Loader'
import Typography from '@mui/material/Typography'


const slugify = (str: string) =>
   str.toLowerCase()
      .trim()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');


const Slug = ({ state, updateState }: CompProps) => {
   const [edit, setEdit] = useState(false)
   return useMemo(() => ((!state?.slug && !edit) ? <></> : <Stack direction="row" spacing={1} alignItems="center" mt={.3}>
      {
         edit ? <TextField
            value={state?.slug || ""}
            onChange={(e: any) => {
               updateState({ slug: slugify(e.target.value) })
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
                  updateState({ slugEdited: true })
               }
            }}
            onBlur={() => {
               setEdit(false)
               updateState({ slugEdited: true })
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
   </Stack>), [edit, state.slug])
}



class PostPublisher extends Component<PublisherProps>{
   state: State = {
      activeTab: "General"
   }

   constructor(props: PublisherProps) {
      super(props)
      this.updateState = this.updateState.bind(this)
   }

   componentDidMount() {
      if (this.props.state) {
         this.setState(this.props.state)
      }
   }

   updateState(state: PublisherProps['state']) {
      this.setState({
         ...this.state,
         ...state
      })
   }


   render() {
      const {
         loading,
         title,
         hidePublish,
         editMode,
         onDraft,
         onPublish,
         onTabChange,
         containerProps
      } = this.props

      const state = this.state

      let tabs = this.props.tabs
      if (tabs && tabs.length) {
         tabs = [{
            title: "General",
            content: <General
               state={this.state}
               updateState={this.updateState}
               props={this.props}
            />
         }, ...tabs]
      }

      return (<Loader loading={loading as any} >
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
                     onClick={() => onDraft && onDraft(this.state as any)}
                  >Save To Draft</Button>
                  <Button
                     variant="contained"
                     onClick={() => onPublish && onPublish(this.state as any)}
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
                     this.updateState({
                        title: e.target.value,
                        slug: !state.slugEdited ? slugify(e.target.value) : state?.slug
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
               <Slug
                  state={this.state}
                  updateState={this.updateState}
                  props={this.props}
               />
               {
                  tabs && <Tabs sx={{ mt: 1 }}
                     variant="scrollable"
                     scrollButtons="auto"
                     value={state.activeTab}
                     onChange={(_e, t) => {
                        onTabChange && onTabChange(t)
                        this.setState({
                           ...this.state,
                           activeTab: t
                        })
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
               {!tabs && <General
                  state={this.state}
                  updateState={this.updateState}
                  props={this.props}
               />}
               {
                  tabs && tabs.map((tab) => {
                     if (tab.title === state.activeTab) {
                        return <div key={tab.title + "_view"}>{tab.content}</div>
                     }
                  })
               }
            </Box>
         </Stack>
      </Loader>
      )
   }
}


export default PostPublisher