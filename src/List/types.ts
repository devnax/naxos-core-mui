import { ComponentType, ReactElement, SVGProps } from 'react';
import { BoxProps, ListProps } from '@mui/material';
import Handler from './Handler'

export type ID = string;

export interface ListItemProps {
    id: ID;
    parentId?: ID | false;
    title: string;
    label?: string;
    heading?: string | ReactElement;
    icon?: ReactElement<SVGProps<SVGElement>>;
    render?: ComponentType<{ id: string }>;
    divider?: boolean;
    active?: boolean;
}

export interface StoreProps extends ListItemProps {
    _id?: string;
    observe?: number;
}

export interface StoreMetaProps {
    active: string
}

export interface ListViewProps extends ListProps {
    handler: Handler<StoreProps, StoreMetaProps>
    button?: boolean;
    onItemClick?: (item: StoreProps) => void;
    autoChange?: false
}

export interface ListPreviewProps extends BoxProps {
    handler: Handler<StoreProps, StoreMetaProps>;

}
