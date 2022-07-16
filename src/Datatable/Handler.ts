import { dispatch, Store } from 'state-range';
import { RowProps, ColumnProps, StoreRowProps, StoreMetaProps } from './types';

abstract class DataTable<R = {}, M = {}> extends Store<StoreRowProps & R, StoreMetaProps & M> {
    renderRow?(row: StoreRowProps & R): StoreRowProps & R;
    onStateChange?(): void;
    onSearch?(text: string): void;
    onTabChange?(tab: string): void;
    onPaginationChange?(): void;

    columns(cols: ColumnProps[]) {
        this.setMeta('columns', cols as any);
    }

    rows(rows: (R & RowProps)[]) {
        dispatch(() => {
            for (let row of rows) {
                this.insert({ checked: false, ...row });
            }
        });
    }

    selectedRows() {
        return this.find({ checked: true } as any);
    }

    loading(is = true) {
        this.setMeta('loading', is as any);
    }

    isLoading() {
        return this.getMeta('loading', false as any);
    }

    clearSelect() {
        this.update({ checked: false } as any, { checked: true } as any);
    }

    clearSearchText() {
        this.setMeta('searchText', '' as any);
    }

    pagination(set?: (StoreMetaProps & M)['pagination']) {
        const def = {
            page: 0,
            perpage: 30,
            perpageOptions: [],
            rowCount: 30
        };
        if (set) {
            this.setMeta('pagination', set);
        }
        const p = this.getMeta('pagination', def as any);
        return {
            ...def,
            ...p
        } as typeof def;
    }
}

export default DataTable;
