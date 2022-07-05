import React, { FC } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Scrollbar from '../../components/Scrollbar';
import BlurBox from '../../BlurBox';
import { DockProps } from '../types';
import AppsRender from './RenderApps';
import DockFooter from './Footer';

const DockPanel: FC<DockProps> = (props) => {
    const { placement, bgimage, bgcolor, blur } = props;
    const isHorigental = placement === 'bottom' || placement === 'top';

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

    return (
        <Box
            height={isHorigental ? 50 : '100%'}
            width={isHorigental ? '100%' : 50}
            bgcolor={bgcolor || 'background.paper'}
            onContextMenu={(e: any) => {
                e.preventDefault();
            }}
        >
            <BlurBox bgImage={bgimage} blur={blur}>
                <Stack justifyContent="space-between" alignItems="center" height={'100%'} width={'100%'} direction={isHorigental ? 'row' : 'column'} gap={1}>
                    <Scrollbar
                        style={{
                            flex: 1,
                            overflow: isHorigental ? 'auto hidden' : 'hidden auto'
                        }}
                    >
                        <Box display="inline-flex" flexDirection={isHorigental ? 'row' : 'column'} bgcolor="background.paper" borderRadius={isHorigental ? '0 24px 24px 0' : '0 0 24px 24px'}>
                            <AppsRender {...props} />
                        </Box>
                    </Scrollbar>
                    <DockFooter {...props} placement={_placement} />
                </Stack>
            </BlurBox>
        </Box>
    );
};

export default DockPanel;
