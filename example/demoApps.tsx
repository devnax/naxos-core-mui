import AppHandler from "../src/Apps"
import SnapChatIcon from "./demo-icons/SnapChat"
import BoardIcon from "./demo-icons/BoardIcon"
import ChatIcon from "./demo-icons/ChatIcon"
import PinterestIcon from "./demo-icons/PinterestIcon"
import VimeoIcon from "./demo-icons/VimeoIcon"
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




export default async () => {

   AppHandler.create({
      id: "Snapchat",
      name: "Snap Chat",
      icon: <SnapChatIcon />,
      render: () => {
         return (
            <Box height="100%" bgcolor="warning.main" color="#fff" p={1} >
               <h1>Awesome</h1>
            </Box>
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