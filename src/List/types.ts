import { ReactElement, SVGProps } from 'react';
import { ListProps } from '@mui/material';

export type ID = string;

type RenderType = ({ id }: { id: string }) => ReactElement;

export interface ListItemProps {
    id: ID;
    parentId?: ID | false;
    title: string;
    label?: string;
    heading?: string | ReactElement;
    icon?: ReactElement<SVGProps<SVGElement>>;
    render?: RenderType; //string url
}

export interface ListItemStoreProps extends ListItemProps {
    _id?: string;
    observe?: number;
    listId: ID;
}

export interface PublicHandlerInterface {
    addItems: (listId: ID, items: ListItemProps[]) => void;
    getItems: (listId: ID) => ListItemStoreProps[];
    getChilds: (listId: ID, parentId: ID) => ListItemStoreProps[];
    deleteList: (listId: ID) => void;
}

export interface ListViewProps extends ListProps {
    listId: ID;
    active?: ID;
    button?: boolean;
    onItemClick?: (itemId: ID) => void;
}
