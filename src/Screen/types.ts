import { StackProps } from '@mui/material/Stack';
import { ReactElement } from 'react';
export interface ScreenProps extends StackProps {
    fullHeight?: boolean;
    appId: string;
    header?: ReactElement;
    footer?: ReactElement;
}
