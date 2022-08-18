import { ReactElement } from 'react';
import { StackProps } from '@mui/material/Stack';
export interface SidebarProps extends StackProps {
    fixed?: boolean;
    fullHeight?: boolean;
    header?: ReactElement;
    footer?: ReactElement;
}
