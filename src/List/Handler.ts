import { dispatch, Store } from 'state-range';
import { ID, ListItemProps, StoreProps, StoreMetaProps } from './types';

abstract class NaxOSListHandler<R = any, M = any> extends Store<StoreProps & R, StoreMetaProps & M> {
    onItemClick?(item: StoreProps): void;

    addItem(item: ListItemProps & R) {
        this.insert({ active: false, parentId: false, ...item } as any);
    }

    addItems(items: (ListItemProps & R)[]) {
        this.insertMany(items, (row) => {
            return { active: false, parentId: false, ...row };
        });
    }

    getParents() {
        return this.find({ parentId: false } as any);
    }

    getPrentOfChild(childId: ID) {
        const item = this.getItem(childId);
        if (item && item.parentId) {
            const parent = this.getItem(item.parentId);
            if (parent) {
                return parent;
            }
        }
    }

    getChilds(parentId: ID) {
        return this.find({ parentId } as any);
    }

    getItem(id: ID) {
        return this.findFirst({ id } as any);
    }

    getActiveItem() {
        const active = this.getMeta('active');
        if (active) {
            return this.getItem(active);
        }
    }

    activeItem(id: ID) {
        dispatch(() => {
            this.update({ active: false } as any, { active: true } as any);
            this.update({ active: true } as any, { id } as any);
            this.setMeta('active', id as any);

            const item = this.getItem(id);
            if (item && item.parentId) {
                let parentId = item.parentId;
                let parent: any;
                while ((parent = this.getItem(parentId))) {
                    this.update({ active: true } as any, { id: parent.id } as any);
                    if (parent.parentId) {
                        parentId = parent.parentId;
                    } else {
                        parentId = '';
                    }
                }
            }
        });
    }
}

export default NaxOSListHandler;
