import { dispatch, Store } from 'state-range';
import { RowProps, ColumnProps, StoreRowProps, TableMetaState } from './types';
import { PartOfRow } from 'state-range/src/types';

class DataTableHandler extends Store<Partial<StoreRowProps>> {
    setColumns(tableId: string, columns?: ColumnProps[]) {
        this.setMeta(`${tableId}_columns`, columns);
    }

    getColumns(tableId: string): ColumnProps[] {
        return this.getMeta(`${tableId}_columns`, []);
    }

    observeColumns(tableId: string) {
        return this.observeMeta(`${tableId}_columns`);
    }

    setRows(tableId: string, rows: RowProps[]) {
        this.delete({ tableId });
        dispatch(() => {
            for (let row of rows) {
                this.setRow(tableId, row);
            }
        });
    }

    setRow(tableId: string, row: RowProps) {
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

    getRows(tableId: string) {
        return this.find({ tableId })
    }

    getRow(tableId: string, id: string) {
        return this.findFirst({ tableId, id })
    }

    findRows(tableId: string, where: PartOfRow<StoreRowProps>) {
        return this.find({ tableId, ...where })
    }

    selectedItems(tableId: string) {
        return this.find({ tableId, checked: true });
    }

    loading(tableId: string, is = true) {
        this.metaState(tableId, { loading: is })
    }

    clearSelect(tableId: string) {
        this.update({ checked: false }, { tableId, checked: true })
    }

    clearSearchText(tableId: string) {
        this.metaState(tableId, { searchText: '' })
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

export default new DataTableHandler();
