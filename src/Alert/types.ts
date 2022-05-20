import { ReactElement } from 'react';

export interface AlertProps {
    type?: 'success' | 'error' | 'warning' | 'info' | 'primary';
    title: string;
    content?: string;
    centerContent?: boolean;
    icon?: ReactElement | true;
    buttonText?: [string, string];
    onClick?: (value: boolean) => void;
}
