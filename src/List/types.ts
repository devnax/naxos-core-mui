import { ComponentType, ReactElement, SVGProps } from 'react';
import { ListProps } from '@mui/material';

export type ID = string;

export interface ListItemProps {
    id: ID;
    parentId?: ID | false;
    title: string;
    label?: string;
    heading?: string | ReactElement;
    icon?: ReactElement<SVGProps<SVGElement>>;
    render?: ComponentType<{ listId: string; id: string }>;
    divider?: boolean;
}

export interface ListItemStoreProps extends ListItemProps {
    _id?: string;
    observe?: number;
    listId: ID;
}

export interface PublicHandlerInterface {
    setItems: (listId: ID, items: ListItemProps[]) => void;
    getItems: (listId: ID) => ListItemStoreProps[];
    getChilds: (listId: ID, parentId: ID) => ListItemStoreProps[];
    deleteList: (listId: ID) => void;
}

export interface ListViewProps extends ListProps {
    listId: ID;
    active?: ID;
    button?: boolean;
    onItemClick?: (item: ListItemStoreProps) => void;
}
