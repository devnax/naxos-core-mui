import { ReactElement } from 'react';
import { RowType } from 'state-range/dist/types';

export type NotifyTypes = 'success' | 'error' | 'warning' | 'info';
export type NotifyLocation = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface NotifyProps {
    type?: NotifyTypes;
    title: string;
    content?: string;
    icon?: ReactElement;
    location?: NotifyLocation;
    closeButton?: boolean;
    small?: boolean;
    autoHide?: boolean;
    pauseOnHover?: boolean;
    onHide?: (options: NotifyRowProps & RowType) => void;
    onClick?: (options: NotifyRowProps & RowType) => void;
}

export interface NotifyRowProps extends NotifyProps {
    timer?: boolean;
}
