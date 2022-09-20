import * as React from 'react';
import DrawerView from './DrawerView';
import { DrawerProps } from './types';
import Layer from '../Layer';

class DrawerHandler {
    open(props: DrawerProps) {
        Layer.open('OS_DRAWER', <DrawerView {...props} />, {
            closeButton: false,
            opacity: 0.5,
            blur: 2,
            animation: props.placement === 'right' ? 'fadeInRight' : 'fadeInLeft'
        });
    }

    close() {
        Layer.close('OS_DRAWER');
    }
}

export default new DrawerHandler();
