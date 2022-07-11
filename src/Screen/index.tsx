import * as React from 'react';
import isHotkey from 'is-hotkey';
import { withStore } from 'state-range';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ScreenProps } from './types';
import Scrollbar from '../components/Scrollbar';
import AppHandler from '../Apps';

const ScreenView: React.FC<ScreenProps> = ({ appId, header, footer, ...props }) => {
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

    return (
        <Stack
            ref={ref}
            width="100%"
            height="100%"
            tabIndex={0}
            sx={{
                outline: 0
            }}
            {...props}
            onKeyDown={(e: React.KeyboardEvent) => {
                if (shortcutKeys) {
                    for (let shortcut of shortcutKeys) {
                        if (isHotkey(shortcut.key, e)) {
                            shortcut.callback();
                            break;
                        }
                    }
                }
            }}
        >
            {header && <Box>{header}</Box>}
            <Scrollbar
                style={{
                    width: '100%',
                    height: '100%',
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
