import { SystemProps } from './types/SystemVars';

const Background = {
    backgroundColor: '',
    backgroundImage: '',
    blur: 0
};

const defaultValues: SystemProps = {
    Desktop: {
        pinedWidgets: [],
        background: Background,
        grids: [],
        pinnedApps: [],
        sortBy: 'name'
    },
    App: {
        runAppId: 'desktop'
    },
    Screen: {
        background: Background
    },
    Dock: {
        pinnedApps: [],
        autoHide: false,
        location: 'left',
        style: 'full',
        background: Background,
        hideTitle: false, // hover toast
        menuIcon: null, // string=img url
        menu: {
            background: Background
        }
    },
    Settings: {
        background: Background
    },
    WidgetDrawer: {
        background: Background
    },
    Themes: {},
    KeyBind: {},

    // Lock and Login
    LockScreen: {
        background: Background,
        showDate: true,
        pinnedApps: []
    }
};

export default defaultValues;
