import React, { useEffect } from 'react';
import { Alert, Layer, Notification, Setting } from "../src";
import { LayerView } from '../src/Layer'
import Notify, { NotifyView } from '../src/Notify'
import { alpha, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import HomeIcon from '@mui/icons-material/Home';
import demoApps from './demoApps';
import { DockView } from '../src/Dock'
import AppHandler from '../src/Apps'
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import Dropdown, { DropdownView } from '../src/Dropdown'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Screen from '../src/Screen'
import { OSView } from '../src/System'


import AppStoreIcon from '@mui/icons-material/ConstructionRounded';
import AppsIcon from '@mui/icons-material/AppRegistrationRounded';
import WidgetsIcon from '@mui/icons-material/ViewCompactRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import LockIcon from '@mui/icons-material/LockRounded';
import FinderIcon from '@mui/icons-material/YoutubeSearchedForRounded';
import AboutOSIcon from '@mui/icons-material/InfoRounded';
import NotificationIcon from '@mui/icons-material/NotificationsActiveRounded';
import Widget from '../src/Widget'

Widget.create({
   id: "google-map",
   title: "Google Map",
   render: <div>Nice</div>,
   icon: <FinderIcon />,
   optionMenu: [
      { title: "ok" }
   ]
})

Widget.create({
   id: "1",
   title: "Facebook",
   render: <div>Nice</div>
})

demoApps()

const Root = () => {
   return <OSView
      runnedAppID='Snapchat'
   />
}

export default Root