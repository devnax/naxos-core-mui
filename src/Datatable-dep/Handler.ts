import { dispatch, Store } from 'state-range';
import { RowProps, ColumnProps, StoreRowProps, TableMetaState } from './types';

class NaxOSCoreDataTable extends Store<Partial<StoreRowProps>> {
    columns(tableId: string, columns?: ColumnProps[]): ColumnProps[] {
        const key = `${tableId}_columns`;
        if (columns) {
            this.setMeta(key, columns);
        }
        return this.getMeta(key, []);
    }

    observeColumns(tableId: string) {
        return this.observeMeta(`${tableId}_columns`);
    }

    rows(tableId: string, rows?: RowProps[]) {
        if (rows) {
            this.delete({ tableId });
            dispatch(() => {
                for (let row of rows) {
                    this.addRow(tableId, row);
                }
            });
        }
        return this.find({ tableId });
    }

    addRow(tableId: string, row: RowProps) {
        if (!this.findFirst({ tableId, id: row.id })) {
            this.insert({ tableId, checked: false, ...row });
        }
    }

    updateRow(tableId: string, id: number | string, row: Partial<RowProps>) {
        this.update({ ...row, id }, { tableId, id });
    }

    deleteRow(tableId: string, id: number | string) {
        this.delete({ tableId, id });
    }

    selectedItems(tableId: string) {
        return this.find({ tableId, checked: true });
    }

    metaState(tableId: string, data?: TableMetaState | null, key?: string) {
        const metakey = `${tableId}_metastate`;
        const _def = {
            loading: false,
            pagination: {
                page: false,
                perPage: false
            },
            searchText: ''
        };

        if (data) {
            this.setMeta(metakey, { ...this.getMeta(metakey, _def), ...data });
        }
        const meta = this.getMeta(metakey, _def);
        if (key !== undefined && key) {
            return meta[key] ? meta[key] : undefined;
        }

        return meta;
    }
}

export default new NaxOSCoreDataTable();
