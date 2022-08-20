import { ReactElement, SVGProps } from 'react';
import { DropdownArrayType } from '../Dropdown/types';
import { AppProps } from '../Apps/types';
import { ButtonProps } from '@mui/material/Button';
import { StackProps } from '@mui/material/Stack';
import { BoxProps } from '@mui/material/Box';

export interface DockMenuProps {
    width?: number;
    blur?: number;
    bgimage?: string;
    bgcolor?: string;
}

type appId = AppProps['id'];

export type DockProps = BoxProps & {
    fullHeight?: boolean;
    appsType?: string;
    appsBottomType?: string;
    active?: appId;
    placement?: 'left' | 'right' | 'top' | 'bottom';
    size?: 'medium' | 'large';
    blur?: number;
    bgimage?: string;
    bgcolor?: string;
    tooltip?: boolean; // hover toast
    menuIcon?: ReactElement<SVGProps<SVGElement>> | string | null; // string=img url
    menuProps?: DockMenuProps;
    menuItems?: DropdownArrayType[];
    notification?: Boolean;
    iconProps?: StackProps;

    onAppClick?: (appId: appId) => void;
    onMenuShow?: () => void;
    onAppContextMenu?: (appId: appId) => false | DropdownArrayType[];
};

export interface DockIconProps extends AppProps {
    active?: boolean;
    placement?: DockProps['placement'];
    buttonProps?: ButtonProps;
    iconProps?: StackProps;
    size?: number;
}
