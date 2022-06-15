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
import AppHandler from '../../Apps'


const DockPanel: FC<DockProps> = (props) => {
   const {
      apps,
      placement,
      bgimage,
      bgcolor,
      blur,
      menuIcon,
      menuItems,
      notificationButton,
      active,
      tooltip,
      onAppContextMenu,
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
         _placement = "top"
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
         onContextMenu={(e: any) => {
            e.preventDefault()
         }}
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
                        apps?.map(appId => {
                           const app = AppHandler.getById(appId)
                           if (app) {
                              if (isTooltip) {
                                 return <Tooltip
                                    key={app.id}
                                    placement={_placement}
                                    title={app.name}
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
                                          {...app}
                                          active={app.id === active}
                                          buttonProps={{
                                             onClick: () => {
                                                onAppClick && onAppClick(app.id)
                                             },
                                             onContextMenu: (e: any) => {
                                                e.preventDefault()
                                                if (typeof onAppContextMenu === 'function') {
                                                   const menu = onAppContextMenu(app.id)
                                                   if (menu) {
                                                      Dropdown.showContextMenu(e, menu, {
                                                         boxProps: {
                                                            sx: {
                                                               '& .MuiListItem-button': {
                                                                  p: .4,
                                                                  px: 1.5,
                                                                  "&>div": { m: 0 }
                                                               }
                                                            }
                                                         }
                                                      })
                                                   }
                                                }
                                             }
                                          }}
                                       />
                                    </Box>
                                 </Tooltip>
                              }
                              return <Box key={app.id}>
                                 <DockIcon
                                    {...app}
                                    active={app.id === active}
                                    buttonProps={{
                                       onClick: () => {
                                          onAppClick && onAppClick(app.id)
                                       },
                                       onContextMenu: (e: any) => {
                                          e.preventDefault()
                                          if (typeof onAppContextMenu === 'function') {
                                             const menu = onAppContextMenu(app.id)
                                             if (menu) {
                                                Dropdown.showContextMenu(e, menu, {
                                                   boxProps: {
                                                      sx: {
                                                         '& .MuiListItem-button': {
                                                            p: .4,
                                                            px: 1.5,
                                                            "&>div": { m: 0 }
                                                         }
                                                      }
                                                   }
                                                })
                                             }
                                          }
                                       }
                                    }}
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