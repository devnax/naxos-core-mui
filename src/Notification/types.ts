import { ReactElement } from 'react';
import { DropdownArrayType } from '../Dropdown/types';

// export interface _NotificationPropsRow extends NotificationProps {
//     _id: string;
//     observe: number;
//     read?: boolean;
// }

export interface NotificationProps {
    id: string | number;
    title: string;
    icon?: ReactElement;
    content?: string;
    onClick?: Function;
    buttonText?: [string, string | null];
    onButtonClick?: Function;
    created?: string;
    notify?: boolean;
    read?: boolean;
}

export interface NotificationSettingProps {
    loading?: boolean;
    onLoad?: Function;
    onLoadMore?: Function;
    optionMenu?: DropdownArrayType[];
    itemOptionMenu?: DropdownArrayType[];
}
