import { dispatch, Store } from 'state-range';
import { RowProps, ColumnProps, StoreRowProps, StoreMetaProps } from './types';

abstract class DataTable<R = any, M = any> extends Store<StoreRowProps & R, StoreMetaProps & M> {
    columns(cols: ColumnProps[]) {
        this.setMeta('columns', cols as any);
    }

    renderRow?(row: StoreRowProps & R): StoreRowProps & R;
    onChange?(): void;

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
}

export default DataTable;
