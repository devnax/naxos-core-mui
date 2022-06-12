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
demoApps()

const Root = () => {
   const apps = AppHandler.getApps()
   const appsIds = apps.map((app) => app.id)

   return <>
      <Stack
         direction="row"
         position="fixed"
         top={0}
         left={0}
         right={0}
         bottom={0}
         height="100vh"
      >
         <DockView
            apps={appsIds}
            active="Snapchat"
            notificationButton={true}
            menuIcon={"https://mui.com/static/images/avatar/2.jpg"}
            menuItems={[
               {
                  title: "Apps",
                  icon: <WidgetsRoundedIcon />
               }
            ]}
         />

      </Stack>
      <LayerView />
      <DropdownView />
   </>
}

export default Root