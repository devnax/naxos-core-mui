import { ReactElement, SVGProps } from 'react';
import { ThemeOptions } from '@mui/material/styles';

type Background = {
    backgroundColor: string;
    backgroundImage: string;
    blur: number;
};

export interface SystemLibsProps {
    Dropdown: {
        background: Background;
    };
    Alert: {
        background: Background;
    };
}

export interface SystemProps {
    Desktop: {
        pinedWidgets: string[];
        background: Background;
        grids: string[];
        pinnedApps: string[];
        sortBy: 'name' | 'date' | 'title';
    };
    App: {
        runAppId: string;
    };
    Screen: {
        background: Background;
    };
    Dock: {
        pinnedApps: string[];
        autoHide: boolean;
        location: 'left' | 'right' | 'top' | 'bottom';
        style: 'full' | 'middle' | 'separate';
        background: Background;
        hideTitle: boolean; // hover toast
        menuIcon: ReactElement<SVGProps<SVGElement>> | string | null; // string=img url
        menu: {
            background: Background;
        };
    };
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
