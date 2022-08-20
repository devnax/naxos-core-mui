import React from 'react';
import { LayerView } from '../../Layer';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { DropdownView } from '../../Dropdown';
import { NotifyView } from '../../Notify';
import Screen from './Screen';
import { DockProps } from '../../Dock/types';
import { ScreenProps } from '../../Screen/types';
import Themex from './Themex';
import { DockView } from '../../Dock';

interface Props {
    runnedAppID: string;
    dockProps?: DockProps;
    screenProps?: ScreenProps;
    hideDock?: boolean;
}

const OSView = ({ dockProps, screenProps, runnedAppID, hideDock }: Props) => {
    const isHor = dockProps?.placement === 'top' || dockProps?.placement === 'bottom'
    return (
        <Themex>
            <Stack
                height={window.innerHeight}
                width="100%"
                direction={isHor ? 'column' : 'row'}
                sx={{
                    overflow: 'hidden!important'
                }}
            >
                <Box flex={1} order={dockProps?.placement === 'right' || dockProps?.placement === 'bottom' ? 0 : 2}>
                    <Screen {...screenProps} fullHeight={isHor ? false : true} appId={runnedAppID} />
                </Box>
                {!hideDock && <DockView active={runnedAppID} {...dockProps} />}
            </Stack>
            <LayerView />
            <DropdownView />
            <NotifyView />
        </Themex>
    );
};

export default OSView;
