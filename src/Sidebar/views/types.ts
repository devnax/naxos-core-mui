import { ReactElement } from 'react';
import { StackProps } from '@mui/material/Stack';
export interface SidebarProps extends StackProps {
    header?: ReactElement;
    footer?: ReactElement;
}
