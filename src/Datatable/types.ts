import { ReactElement } from 'react';
import { TabProps } from '@mui/material/Tab';
import { TableCellProps } from '@mui/material/TableCell';
import { Row } from 'state-range/src/types';
import { DropdownArrayType } from '../Dropdown';

export interface StoreRowProps extends RowProps {
    tableId?: string;
    checked?: boolean;
}

export interface RowProps {
    id: string | number;
    [key: string]: any;
}

export interface ColumnProps extends TableCellProps {
    field: keyof RowProps;
    title: string;
}

export interface PaginationProps {
    page?: number;
    perPage?: number;
}

export interface TableMetaState {
    searchText?: string;
    loading?: boolean;
    pagination?: PaginationProps;
    currentTab?: string | number;
}

export interface DataTableProps {
    init?: Function;
    id: string;
    checkbox?: boolean;
    onSearch?: (text: string) => void;
    rowActions?: (row: Row<Partial<RowProps>>) => ReactElement | DropdownArrayType[];
    selectNavActions?: (props: { selectedItems: RowProps[] }) => ReactElement;
    filterMenu?: (props: any) => ReactElement;

    onRenderRow?: (row: Row<Partial<RowProps>>) => Row<Partial<RowProps>>;

    hideSearchbar?: boolean;

    // Tabs Props
    tabs?: TabProps[];
    activTab?: string;

    // Pagination
    rowCount?: number;
    perPageOptions?: number[];
    page?: number;
    hidePagination?: boolean;
    hideRowPerPage?: boolean;
    onPaginationChange?: (info: PaginationProps) => void;

    hideFooter?: boolean;
}
