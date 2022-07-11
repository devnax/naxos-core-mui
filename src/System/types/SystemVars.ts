import { ReactElement, SVGProps } from 'react';
import { ThemeOptions } from '@mui/material/styles';
import { DockProps } from '../../Dock/types'
type Background = {
    backgroundColor: string;
    backgroundImage: string;
    blur: number;
};

export interface SystemProps {
    Desktop: {
        pinnedApps: string[];
        pinnedWidgets: string[];
        background: Background;
        grids: string[];
        sortBy: 'name' | 'date' | 'title';
    };
    App: {
        runAppId: string;
    };
    Screen: {
        background: Background;
    };
    Dock: DockProps;
    Settings: {
        background: Background;
    };
    WidgetDrawer: {
        background: Background;
    };
    Themes: ThemeOptions;

    KeyBind: {
        [key: string]: string; // value = CMD Key
    };

    // Lock and Login
    LockScreen: {
        background: Background;
        showDate: Boolean;
        pinnedApps: string[];
    };
}
