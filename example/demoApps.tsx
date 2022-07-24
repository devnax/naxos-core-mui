import * as React from 'react'
import AppHandler from "../src/Apps"
import SnapChatIcon from "./demo-icons/SnapChat"
import BoardIcon from "./demo-icons/BoardIcon"
import ChatIcon from "./demo-icons/ChatIcon"
import PinterestIcon from "./demo-icons/PinterestIcon"
import VimeoIcon from "./demo-icons/VimeoIcon"
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import SignalWifi3BarRoundedIcon from '@mui/icons-material/SignalWifi3BarRounded';

import SidebarView from '../src/Sidebar'
import { Typography } from "@mui/material"

import { ListView, ListPreview } from '../src/List'
import DataTable from './DataTable'
import ListHandler from './List'
import PostPublisher from './Post'

export default async () => {


   AppHandler.create({
      id: "Snapchat",
      name: "Snap Chat",
      icon: <SnapChatIcon />,
      shorcutKeys: [
         { key: "alt+2", callback: () => alert("Alt+1") },
         { key: "ctrl+a", callback: () => alert("ctrl+1") }
      ],
      render: () => {
         return (
            <Stack direction="row" >
               <SidebarView
                  p={1}
                  borderRight={1}
                  borderColor="grey.800"
                  width={270}
                  header={<Box>
                     <Typography variant="h6">Widget List</Typography>
                  </Box>}
               >
                  <ListView
                     handler={ListHandler}
                     onItemClick={(id) => {
                        console.log(id)
                     }} />
               </SidebarView>
               <Box flex={1} >
                  <PostPublisher />
               </Box>
            </Stack>
         )
      }
   })
   AppHandler.create({
      id: "white-bord",
      name: "White Board",
      icon: <BoardIcon />,
      render: () => {
         return (
            <Box height="100%" bgcolor="primary.main" color="#fff" p={1} >
               <h1>White Board</h1>
            </Box>
         )
      }
   })
   AppHandler.create({
      id: "chat",
      name: "Chat",
      icon: <ChatIcon />,
      render: () => <div>ChatIcon </div>
   })
   AppHandler.create({
      id: "PinterestIcon",
      name: "Pinterest",
      icon: <PinterestIcon />,
      render: () => <div>Pinterest </div>
   })
   AppHandler.create({
      id: "VimeoIcon",
      name: "Vimeo",
      icon: <VimeoIcon />,
      render: () => <div>Vimeo </div>
   })
   AppHandler.create({
      id: "Signal",
      name: "Signal",
      icon: <SignalWifi3BarRoundedIcon />,
      render: () => <div>Nice </div>
   })
}