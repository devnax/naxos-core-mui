import { ReactElement } from 'react';
import { PopperProps as PProps } from '@mui/material/Popper';
import { ListItemButtonProps } from '@mui/material/ListItemButton';
import { BoxProps } from '@mui/material/Box';

export interface DropdownRowProps {
    _id: string;
    observe: number;
}

export type PopperProps = Omit<PProps, 'open'>;

export interface OptionsProps extends PopperProps {
    boxProps?: BoxProps
}

export interface DropdownProps {
    active: boolean;
    anchor: HTMLElement;
    content: ReactElement | DropdownArrayType[];
    props: OptionsProps
}

export type DropdownArrayType = ListItemButtonProps & {
    title: string | ReactElement;
    icon?: ReactElement;
    label?: string | ReactElement;
    divider?: boolean;
    onClick?: Function;
    onClose?: Function;
};
