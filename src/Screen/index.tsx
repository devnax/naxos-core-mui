import * as React from 'react';
import isHotkey from 'is-hotkey';
import { withStore } from 'state-range';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ScreenProps } from './types';
import Scrollbar from '../Scrollbar';
import AppHandler from '../Apps';
import { isServer } from '../utils';

const ScreenView: React.FC<ScreenProps> = ({ appId, fullHeight, header, footer, ...props }) => {
    const ref = React.useRef();
    const App = AppHandler.getById(appId);
    if (!App) {
        return <></>;
    }

    const Render = App.render;
    const shortcutKeys = App.shorcutKeys;

    React.useEffect(() => {
        if (ref.current) {
            (ref.current as any).focus();
        }
    }, [App.id]);

    fullHeight = fullHeight === undefined || fullHeight === true;
    let height: any = '100%';
    if (fullHeight) {
        height = isServer ? '100%' : window.innerHeight;
    }

    return (
        <Stack
            ref={ref}
            width="100%"
            height={height}
            tabIndex={0}
            sx={{
                outline: 0,
                overflow: 'hidden'
            }}
            {...props}
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                if (shortcutKeys) {
                    for (let shortcut of shortcutKeys) {
                        if (isHotkey(shortcut.key, e)) {
                            shortcut.callback();
                            break;
                        }
                    }
                }
                if (props.onKeyDown) {
                    props.onKeyDown(e);
                }
            }}
        >
            {header && <Box>{header}</Box>}
            <Scrollbar
                style={{
                    width: '100%',
                    height,
                    flex: 1
                }}
            >
                <Render id={appId} />
            </Scrollbar>
            {footer && <Box>{footer}</Box>}
        </Stack>
    );
};

export default withStore(ScreenView);
