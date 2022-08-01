import React from 'react';
import { LayerView } from '../../Layer';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { DropdownView } from '../../Dropdown';
import { NotifyView } from '../../Notify';
import Dock from './Dock';
import Screen from './Screen';
import { DockProps } from '../../Dock/types';
import { ScreenProps } from '../../Screen/types';
import Themex from './Themex';

interface Props {
    runnedAppID: string;
    dockProps?: DockProps;
    screenProps?: ScreenProps;
    hideDock?: boolean;
}

const OSView = ({ dockProps, screenProps, runnedAppID, hideDock }: Props) => {
    return (
        <Themex>
            <Stack
                height="100vh"
                width="100%"
                direction={dockProps?.placement === 'top' || dockProps?.placement === 'bottom' ? 'column' : 'row'}
                sx={{
                    overflow: 'hidden!important'
                }}
            >
                <Box flex={1} order={dockProps?.placement === 'right' || dockProps?.placement === 'bottom' ? 0 : 2}>
                    <Screen {...screenProps} appId={runnedAppID} />
                </Box>
                {!hideDock && <Dock {...dockProps} active={runnedAppID} />}
            </Stack>
            <LayerView />
            <DropdownView />
            <NotifyView />
        </Themex>
    );
};

export default OSView;
