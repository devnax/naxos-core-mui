import React, { FC } from 'react';
import Box from '@mui/material/Box';
import DockIcon from './DockIcon';
import Dropdown from '../../Dropdown';
import { DockProps } from '../types';
import Tooltip from '@mui/material/Tooltip';
import AppHandler from '../../Apps';

interface Props extends DockProps {
   renderFooter?: boolean
}


const AppsRender: FC<Props> = (props) => {
   const { apps, appsBottom, placement, active, tooltip, onAppContextMenu, onAppClick, renderFooter } = props;
   const isTooltip = tooltip === undefined || tooltip;

   let _placement: any = 'right';
   switch (placement) {
      case 'right':
         _placement = 'left';
         break;
      case 'top':
         _placement = 'top';
         break;
      case 'bottom':
         _placement = 'top';
         break;
   }

   const appItems = renderFooter ? appsBottom : apps

   return <>
      {
         appItems?.map((appId) => {
            const app = AppHandler.getById(appId);
            if (app) {

               const Icon = <DockIcon
                  placement={placement}
                  {...app}
                  active={app.id === active}
                  buttonProps={{
                     onClick: () => {
                        onAppClick && onAppClick(app.id);
                     },
                     onContextMenu: (e: any) => {
                        e.preventDefault();
                        if (typeof onAppContextMenu === 'function') {
                           const menu = onAppContextMenu(app.id);
                           if (menu) {
                              Dropdown.showContextMenu(e, menu, {
                                 boxProps: {
                                    sx: {
                                       '& .MuiListItem-button': {
                                          p: 0.4,
                                          px: 1.5,
                                          '&>div': { m: 0 }
                                       }
                                    }
                                 }
                              });
                           }
                        }
                     }
                  }}
               />

               return <Box key={app.id}>
                  {
                     isTooltip ? <Tooltip
                        placement={_placement}
                        title={app.name}
                        arrow
                        PopperProps={{
                           sx: {
                              userSelect: 'none'
                           }
                        }}
                     >
                        <Box>{Icon}</Box>
                     </Tooltip> : Icon
                  }
               </Box>
            }
            return '';
         })
      }
   </>

};

export default AppsRender;
