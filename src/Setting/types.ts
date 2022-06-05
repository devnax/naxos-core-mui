import { ReactElement } from 'react';
import { LayerOptionProps } from '../Layer/types';

export interface ConfigProps extends LayerOptionProps {
    closeOnLayer?: boolean;
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

export interface SettingRowProps extends SettingProps {
    preview?: boolean;
}

export interface PublicHandlerInterface {
    setConfig: (conf: ConfigProps) => void;
    getConfig: () => ConfigProps;
    create: (options: SettingProps) => void;
    open: (config?: ConfigProps) => void;
    close: () => void;
    get: (id: string) => SettingProps | void;
    preview: (id: string) => void;
    remove: (id: string) => void;
}
