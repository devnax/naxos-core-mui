import { ReactElement } from 'react';
import { TabProps } from '@mui/material/Tab';
import { TableCellProps } from '@mui/material/TableCell';
import { Row } from 'state-range/src/types';
import { DropdownArrayType } from '../Dropdown/types';
import DataTable from './Handler';

export interface RowProps {
    id: string | number;
    [key: string]: any;
}

export interface StoreRowProps extends RowProps {
    checked?: boolean;
}

export interface ColumnProps extends TableCellProps {
    field: keyof RowProps;
    title: string;
}

export interface StoreMetaProps {
    checkbox: boolean;
    columns: ColumnProps[];
    loading: boolean;
    searchText: string;
    currentTab: string | number;
    searchBox: boolean;
    tabs: TabProps[];
    activTab: string;
    hideFooter: boolean;
    pagination: {
        page?: number;
        perpage?: number | false;
        rowCount?: number;
        perpageOptions?: number[];
    };
}

export interface DataTableProps {
    handler: DataTable<StoreRowProps, StoreMetaProps>;
    rowActions?: (row: Row<Partial<RowProps>>) => DropdownArrayType[];
    selectActions?: (props: { selected: RowProps[] }) => ReactElement;
    filterMenu?: (props: any) => ReactElement | DropdownArrayType[];
}
