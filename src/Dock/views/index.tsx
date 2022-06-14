import React, { FC } from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Scrollbar from '../../components/Scrollbar'
import BlurBox from '../../BlurBox'
import DockIcon from './DockIcon'
import Dropdown from '../../Dropdown'
import Notification from '../../Notification'
import { DockProps } from '../types'
import NotificationsIcon from '@mui/icons-material/NotificationsRounded';
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'


const DockPanel: FC<DockProps> = (props) => {
   const {
      icons,
      placement,
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
   const isHorigental = placement === "bottom" || placement === "top"
   const isTooltip = tooltip === undefined || tooltip

   let _placement: any = 'right'
   switch (placement) {
      case 'right':
         _placement = "left"
         break;
      case 'top':
         _placement = "bottom"
         break;
      case 'bottom':
         _placement = "top"
         break;
   }

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
               direction={isHorigental ? "row" : "column"}
               gap={1}
            >
               <Scrollbar style={{
                  flex: 1,
                  overflow: isHorigental ? "auto hidden" : "hidden auto"
               }}>
                  <Box
                     display='inline-flex'
                     flexDirection={isHorigental ? "row" : "column"}
                     bgcolor="background.paper"
                     borderRadius={isHorigental ? '0 24px 24px 0' : '0 0 24px 24px'}
                  >
                     {
                        icons?.map(icon => {
                           if (icon) {

                              if (isTooltip) {
                                 return <Tooltip
                                    key={icon.id}
                                    placement={_placement}
                                    title={icon.name}
                                    arrow
                                    PopperProps={{
                                       sx: {
                                          userSelect: "none"
                                       }
                                    }}
                                 >
                                    <Box>
                                       <DockIcon
                                          placement={placement}
                                          {...icon}
                                          active={icon.id === active}
                                          onClick={onAppClick}
                                       />
                                    </Box>
                                 </Tooltip>
                              }
                              return <Box key={icon.id}>
                                 <DockIcon
                                    {...icon}
                                    active={icon.id === active}
                                    onClick={onAppClick}
                                 />
                              </Box>
                           }
                           return ''
                        })
                     }
                  </Box>
               </Scrollbar>
               <Stack
                  alignItems="center"
                  justifyContent={isHorigental ? "flex-end" : 'center'}
                  p={isHorigental ? "0 8px" : "4px 0"}
                  direction={isHorigental ? "row" : "column"}
                  height={isHorigental ? "100%" : "initial"}
                  width={isHorigental ? "initial" : "100%"}
                  gap={2}
                  bgcolor="background.paper"
                  borderRadius={isHorigental ? '24px 0 0 24px' : '24px 24px 0 0'}
               >
                  {
                     (notificationButton === undefined || notificationButton) && <IconButton
                        onClick={() => {
                           Notification.open()
                        }}
                        size="small"
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
                              },
                              placement: _placement
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
      </Box >
   )
}

export default DockPanel