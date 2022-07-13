import { ReactElement } from 'react';
import { TabProps } from '@mui/material/Tab';
import { BoxProps } from '@mui/material/Box';
import { TableCellProps } from '@mui/material/TableCell';
import { Row, PartOfRow } from 'state-range/src/types';
import { DropdownArrayType } from '../Dropdown/types';

export interface StoreRowProps extends RowProps {
    tableId?: string;
    checked?: boolean;
    _id: string;
    observe: string;
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

    rowRender?: (row: Row<Partial<RowProps>>) => Row<Partial<RowProps>>;

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
    sx?: BoxProps;
}



export interface PublicHandlerType {
    setColumns: (tableId: string, columns?: ColumnProps[]) => void;
    setRows: (tableId: string, rows: RowProps[]) => void;
    setRow: (tableId: string, rows: RowProps) => void;
    getRows: (tableId: string) => Row<Partial<StoreRowProps>>[],
    findRows: (tableId: string, where: PartOfRow<StoreRowProps>) => Row<Partial<StoreRowProps>>[],
    getRow: (tableId: string, id: string) => Row<Partial<StoreRowProps>> | null;
    deleteRow: (tableId: string, id: number | string) => void;
    updateRow: (tableId: string, id: number | string, row: Partial<RowProps>) => void;
    loading: (tableId: string, is: boolean) => void;
    clearSelect: (tableId: string) => void;
    clearSearchText: (tableId: string) => void;
}