import { SystemProps } from './types/SystemVars';

const Background = {
    backgroundColor: '',
    backgroundImage: '',
    blur: 0
};

const defaultValues: SystemProps = {
    Desktop: {
        pinnedWidgets: [],
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
    Dock: {},
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
