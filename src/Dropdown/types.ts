import { ReactElement } from 'react';
import { PopperProps as PProps } from '@mui/material/Popper';
import { ListItemButtonProps } from '@mui/material/ListItemButton';

export interface DropdownRowProps {
    _id: string;
    observe: number;
}

export type PopperProps = Omit<PProps, 'open'>;

export interface DropdownProps {
    active: boolean;
    anchor: HTMLElement;
    content: ReactElement | DropdownArrayType[];
    props: PopperProps;
}

export type DropdownArrayType = ListItemButtonProps & {
    title: string | ReactElement;
    icon?: ReactElement;
    label?: string | ReactElement;
    divider?: boolean;
    onClick?: Function;
    onClose?: Function;
};
