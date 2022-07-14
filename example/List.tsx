import * as React from 'react'
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded';
import BluetoothAudioRoundedIcon from '@mui/icons-material/BluetoothAudioRounded';
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import ParkRoundedIcon from '@mui/icons-material/ParkRounded';
import SettingsVoiceRoundedIcon from '@mui/icons-material/SettingsVoiceRounded';
import Box from '@mui/material/Box'

import List from '../src/List'

class Handler extends List {
   constructor() {
      super();
      this.addItems([
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

      this.activeItem('add_post')
   }
}

export default new Handler