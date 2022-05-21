import { ReactElement } from 'react';

export interface ConfigProps {
    opacity?: number;
    blur?: number;
    bgImage?: string;
    gradient?: [string, string];
}

export interface SettingProps {
    id: string;
    title: string;
    render: ReactElement;
    category: string;
    categoryIcon?: ReactElement; // if new cat
    // methods
    onSettingOpen?: Function;
    onSettingClose?: Function;
    onView?: Function;
    onExit?: Function;
}

export interface PublicHandlerInterface {
    setConfig: (conf: ConfigProps) => void;
    getConfig: () => ConfigProps;
    create: (options: SettingProps) => void;
    open: () => void;
    close: () => void;
    get: (id: string) => SettingProps | void;
    remove: (id: string) => void;
}
