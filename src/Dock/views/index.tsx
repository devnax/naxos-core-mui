import React, { FC } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Scrollbar from '../../Scrollbar';
import BlurBox from '../../BlurBox';
import { DockProps } from '../types';
import AppsRender from './RenderApps';
import DockFooter from './Footer';

const DockPanel: FC<DockProps> = (props) => {
    let { appsType, appsBottomType, active, tooltip, menuIcon, menuProps, menuItems, onAppClick, onMenuShow, onAppContextMenu, size, iconProps, placement, bgimage, bgcolor, blur, fullHeight, notification, ...boxProps } = props;

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

    fullHeight = fullHeight === undefined || fullHeight === true;
    let height: any = '100%';
    if (fullHeight) {
        height = window.innerHeight;
    }

    let _size = 50
    if (size === 'medium') {
        _size = 55
    } else if (size === 'large') {
        _size = 60
    }

    return (
        <Box
            height={isHorigental ? _size : height}
            width={isHorigental ? '100%' : _size}
            bgcolor={bgcolor || 'background.paper'}
            onContextMenu={(e: any) => {
                e.preventDefault();
            }}
            {...boxProps}
        >
            <BlurBox bgImage={bgimage} blur={blur}>
                <Stack justifyContent="space-between" alignItems="center" height={'100%'} width={'100%'} direction={isHorigental ? 'row' : 'column'} gap={1}>
                    <Scrollbar
                        thumbSize={2}
                        style={{
                            flex: 1,
                            overflow: isHorigental ? 'auto hidden' : 'hidden auto'
                        }}
                    >
                        <Box display="inline-flex" flexDirection={isHorigental ? 'row' : 'column'} bgcolor="background.paper" borderRadius={isHorigental ? '0 24px 24px 0' : '0 0 24px 24px'}>
                            <AppsRender
                                appsType={appsType}
                                active={active}
                                tooltip={tooltip}
                                menuIcon={menuIcon}
                                menuProps={menuProps}
                                menuItems={menuItems}
                                iconProps={iconProps}
                                onAppClick={onAppClick}
                                onMenuShow={onMenuShow}
                                size={size}
                                onAppContextMenu={onAppContextMenu}
                                {...props}
                            />
                        </Box>
                    </Scrollbar>
                    <DockFooter {...props} appsBottomType={appsBottomType} notification={notification} placement={_placement} />
                </Stack>
            </BlurBox>
        </Box>
    );
};

export default DockPanel;
