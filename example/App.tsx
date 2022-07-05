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
import { DropdownView } from '../src/Dropdown'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Screen from '../src/Screen'


import AppStoreIcon from '@mui/icons-material/ConstructionRounded';
import AppsIcon from '@mui/icons-material/AppRegistrationRounded';
import WidgetsIcon from '@mui/icons-material/ViewCompactRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import LockIcon from '@mui/icons-material/LockRounded';
import FinderIcon from '@mui/icons-material/YoutubeSearchedForRounded';
import AboutOSIcon from '@mui/icons-material/InfoRounded';
import NotificationIcon from '@mui/icons-material/NotificationsActiveRounded';


demoApps()

const Root = () => {
   const apps = AppHandler.getApps()

   return <>
      <Stack
         height="100vh"
         width="100%"
         direction="row"
      >
         <DockView
            apps={apps.map((app) => app.id)}
            tooltip
            active="Snapchat"
            notificationButton={false}
            menuIcon={<SettingsOutlinedIcon />}
            onAppContextMenu={(appId) => {
               if (appId === 'Snapchat') {
                  return false
               }
               return [
                  { title: "Open" },
                  { title: "App Info" },
                  { title: "Uninstall App" },
               ]
            }}
            menuItems={[
               {
                  title: "My Apps",
                  icon: <AppsIcon sx={{ fontSize: '24px!important' }} />,
               },
               {
                  title: "Widgets",
                  icon: <WidgetsIcon sx={{ fontSize: '24px!important' }} />,
               },

               {
                  title: "Finder",
                  icon: <FinderIcon sx={{ fontSize: '24px!important' }} />,

               },
               {
                  title: "Notifications",
                  icon: <NotificationIcon sx={{ fontSize: '24px!important' }} />,

               },
               {
                  title: "Settings",
                  icon: <SettingsIcon sx={{ fontSize: '24px!important' }} />,
                  label: <Box sx={{ color: 'grey.600', fontSize: 11 }}>CRL+S</Box>,

               },
               {
                  title: "App Store",
                  icon: <AppStoreIcon sx={{ fontSize: '24px!important' }} />,

               },
               {
                  title: "About OS",
                  icon: <AboutOSIcon sx={{ fontSize: '24px!important' }} />,

                  divider: true
               },
               {
                  title: "Lock Screen",
                  icon: <LockIcon sx={{ fontSize: '24px!important' }} />
               },
               {
                  title: "Logout",
                  icon: <LogoutIcon sx={{ fontSize: '24px!important' }} />,
               }
            ]}
         />
         <Box flex={1}>
            <Screen
               appId="Snapchat"
            />
         </Box>
      </Stack>
      <LayerView />
      <DropdownView />
   </>
}

export default Root