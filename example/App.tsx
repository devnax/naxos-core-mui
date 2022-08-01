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

import { OSView } from '../src/System'

import FinderIcon from '@mui/icons-material/YoutubeSearchedForRounded';
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
      runnedAppID='Signal'
      dockProps={{
         notificationButton: true
      }}
   />
}

export default Root