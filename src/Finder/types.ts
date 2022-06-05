import { ReactElement } from 'react';

export interface DataProps {
    icon: string | ReactElement;
    title: string;
    description?: string;
    [key: string]: any;
}

export type SubcribeCallbackType = (searchText: string, page: number) => Promise<DataProps[]>;

export interface SubcriberProps {
    id: string;
    callback: SubcribeCallbackType;
    onItemClick?: (item: DataProps) => void;
    checked?: boolean;
}

export interface SubcriberPropsPrivate {
    _id: string;
    observe: number;
    id: string;
    callback: SubcribeCallbackType;
    checked: boolean;
    onItemClick?: (item: DataProps) => void;
}

export interface FinderSettingProps {
    onLoad?: () => void;
    onClose?: () => void;
    filterable?: boolean;
    placeholder?: string;
    findOnly?: string;
}

export interface FoundedData {
    subscriberID: string;
    dataList: DataProps[];
}
