import React, { useEffect } from 'react';
import { Alert, Layer, Notification, Setting } from "../src";
import { LayerView } from '../src/Layer'
import Notify, { NotifyView } from '../src/Notify'
import { alpha, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import ListViewHandler, { ListViewTemplate } from '../src/ListView'
import IconButton from '@mui/material/IconButton'
import HomeIcon from '@mui/icons-material/Home';
import demoApps from './demoApps';
import { DockView } from '../src/Dock'
import AppHandler from '../src/Apps'
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import { DropdownView } from '../src/Dropdown'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
demoApps()

const Root = () => {
   const apps = AppHandler.getApps()

   return <>
      <Box
         height="100vh"
         width="100%"
      >
         <DockView
            icons={apps}
            active="Snapchat"
            notificationButton={false}
            menuIcon={<SettingsOutlinedIcon />}
            menuItems={[
               {
                  title: "Apps",
                  icon: <WidgetsRoundedIcon />
               }
            ]}
         />

      </Box>
      <LayerView />
      <DropdownView />
   </>
}

export default Root