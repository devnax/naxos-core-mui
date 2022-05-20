import { ReactElement } from 'react';
import { PopperProps } from '@mui/material/Popper';
import { ListItemButtonProps } from '@mui/material/ListItemButton';

export interface DropdownRowProps {
    _id: string;
    observe: number;
}

export interface DropdownProps {
    active: boolean;
    anchor: HTMLElement;
    content: ReactElement | DropdownArrayType[];
    props: Partial<PopperProps>;
}

export type DropdownArrayType = ListItemButtonProps & {
    title: string | ReactElement;
    icon?: ReactElement;
    label?: string | ReactElement;
    divider?: boolean;
    onClick?: Function;
    onClose?: Function;
};
