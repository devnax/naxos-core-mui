import * as React from 'react'
import AppHandler from "../src/Apps"
import SnapChatIcon from "./demo-icons/SnapChat"
import BoardIcon from "./demo-icons/BoardIcon"
import ChatIcon from "./demo-icons/ChatIcon"
import PinterestIcon from "./demo-icons/PinterestIcon"
import VimeoIcon from "./demo-icons/VimeoIcon"
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

import AppleIcon from '@mui/icons-material/Apple';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded';
import BluetoothAudioRoundedIcon from '@mui/icons-material/BluetoothAudioRounded';
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import ParkRoundedIcon from '@mui/icons-material/ParkRounded';
import SettingsVoiceRoundedIcon from '@mui/icons-material/SettingsVoiceRounded';
import SignalWifi3BarRoundedIcon from '@mui/icons-material/SignalWifi3BarRounded';

import { SidebarView } from '../src/Sidebar'
import { Typography } from "@mui/material"

import List, { ListView, ListPreview } from '../src/List'
import DataTable from './DataTable'


export default async () => {

   List.setItems('list', [
      {
         id: "deshboard",
         title: "Deshboard",
         icon: <ArchiveRoundedIcon />,
         render: () => <Box p={2} bgcolor="red">Red</Box>,
         divider: true
      },
      {
         id: "pages",
         title: "Pages",
         icon: <GraphicEqIcon />,
         render: () => <Box p={2} bgcolor="red">Red</Box>
      },
      {
         id: "users",
         title: "Users",
         label: "20+",
         icon: <SettingsVoiceRoundedIcon />,
         render: () => <Box p={2} bgcolor="red">Red</Box>
      },
      {
         heading: "General",
         id: "posts",
         title: "Posts",
         icon: <ParkRoundedIcon />,
         render: () => <Box p={2} bgcolor="green">Green</Box>
      },
      {
         id: "add_post",
         title: "Add New Post",
         parentId: "posts",
         icon: <ExtensionRoundedIcon />,
         render: () => <Box p={2} bgcolor="green">Green</Box>
      },
      {
         id: "another",
         title: "Another",
         parentId: "posts",
         icon: <BluetoothAudioRoundedIcon />,
         render: () => <Box p={2} bgcolor="green">Green</Box>
      },
      {
         id: "another",
         title: "User Another",
         parentId: "users",
         icon: <BluetoothAudioRoundedIcon />,
         render: () => <Box p={2} bgcolor="green">Green</Box>
      },

   ])

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
            <Stack height="100%" color="#fff" direction="row">
               <SidebarView
                  p={1}
                  borderRight={1}
                  borderColor="grey.800"
                  width={270}
                  header={<Box>
                     <Typography variant="h6">Widget List</Typography>
                  </Box>}
               >
                  <ListView listId="list" active="another" onItemClick={(id) => {
                     console.log(id)
                  }} />
               </SidebarView>
               <Box flex={1} height="100%">
                  <DataTable />
                  <ListPreview
                     listId="list" activeId="another"
                  />
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