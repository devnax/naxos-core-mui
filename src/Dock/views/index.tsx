import React, { FC } from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Scrollbar from '../../components/Scrollbar'
import BlurBox from '../../BlurBox'
import DockIcon from './DockIcon'
import AppHandler from '../../Apps'
import Dropdown from '../../Dropdown'
import Notification from '../../Notification'
import { DockProps } from '../types'
import NotificationsIcon from '@mui/icons-material/NotificationsRounded';
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'


const DockPanel: FC<DockProps> = (props) => {
   const {
      apps,
      location,
      bgimage,
      bgcolor,
      blur,
      menuIcon,
      menuItems,
      notificationButton,
      active,
      tooltip,
      onAppClick,
      onMenuShow
   } = props
   const isHorigental = location === "bottom" || location === "top"
   const isTooltip = tooltip === undefined || tooltip

   return (
      <Box
         height={isHorigental ? 50 : "100%"}
         width={isHorigental ? "100%" : 50}
         bgcolor={bgcolor || "background.paper"}
      >
         <BlurBox
            bgImage={bgimage}
            blur={blur}
         >
            <Stack
               justifyContent='space-between'
               alignItems="center"
               height={"100%"}
               width={"100%"}
            >
               <Scrollbar style={{ flex: 1, overflowX: 'hidden' }}>
                  {
                     apps?.map(appId => {
                        const app = AppHandler.getById(appId)
                        if (app) {

                           if (isTooltip) {
                              return <Tooltip
                                 key={appId}
                                 placement="right"
                                 title={app.name}
                                 sx={{}}
                                 arrow
                              >
                                 <Box>
                                    <DockIcon
                                       {...app}
                                       active={appId === active}
                                       onClick={onAppClick}
                                    />
                                 </Box>
                              </Tooltip>
                           }
                           return <Box key={appId}>
                              <DockIcon
                                 {...app}
                                 active={appId === active}
                                 onClick={onAppClick}
                              />
                           </Box>
                        }
                        return ''
                     })
                  }
               </Scrollbar>
               <Stack
                  alignItems="center"
                  justifyContent='center'
                  width="100%"
                  p={.5}
                  pb={1}
               >
                  {
                     (notificationButton === undefined || notificationButton) && <IconButton
                        onClick={() => {
                           Notification.open()
                        }}
                     >
                        <NotificationsIcon />
                     </IconButton>
                  }

                  <Box
                     onClick={(e: any) => {
                        if (menuItems) {
                           Dropdown.show(e.currentTarget, menuItems, {
                              sx: {
                                 '& svg': {
                                    fontSize: "21px!important"
                                 },
                                 '& .MuiListItemIcon-root': {
                                    minWidth: "30px!important"
                                 }
                              }
                           })

                           if (typeof onMenuShow === 'function') {
                              onMenuShow()
                           }
                        }
                     }}
                  >
                     {
                        typeof menuIcon === 'string' ? <Avatar
                           sx={{
                              width: 26,
                              height: 26,
                              cursor: 'pointer',
                              mt: 1,
                              boxShadow: '0 0 0 2px rgba(255,255,255, .2)'
                           }}
                           src={menuIcon}
                        /> : <IconButton
                           sx={{
                              '& svg': {
                              }
                           }}
                        >
                           {menuIcon}
                        </IconButton>
                     }
                  </Box>

               </Stack>
            </Stack>
         </BlurBox>
      </Box>
   )
}

export default DockPanel