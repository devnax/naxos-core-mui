import React from 'react';
import { LayerView } from '../../Layer'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { DropdownView } from '../../Dropdown'
import { NotifyView } from '../../Notify'
import Dock from './Dock';
import Screen from './Screen';
import { DockProps } from '../../Dock/types';
import { ScreenProps } from '../../Screen/types';
import Themex from './Themex'

interface Props {
   dockProps?: DockProps;
   screenProps?: ScreenProps;
   runnedAppID: string;
}


const OSView = ({ dockProps, screenProps, runnedAppID }: Props) => {

   return <Themex>
      <Stack
         height="100vh"
         width="100%"
         direction="row"
         sx={{
            overflow: 'hidden!important'
         }}
      >
         <Dock {...dockProps} active={runnedAppID} />
         <Box flex={1}>
            <Screen {...screenProps} appId={runnedAppID} />
         </Box>
      </Stack>
      <LayerView />
      <DropdownView />
      <NotifyView />
   </Themex>
}

export default OSView