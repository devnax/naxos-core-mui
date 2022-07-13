import { dispatch, Store } from 'state-range';
import { ID, ListItemProps, ListItemStoreProps } from './types';

class NaxOSListHandler extends Store<ListItemStoreProps> {
    setItems(listId: ID, items: ListItemProps[]) {
        dispatch(() => {
            for (let item of items) {
                if (item.parentId) {
                    const isParent = this.findFirst({ id: item.parentId });
                    if (isParent && isParent.parentId) {
                        continue;
                    } else if (!isParent) {
                        continue;
                    }
                }
                if (!this.findFirst({ id: item.id, listId })) {
                    this.insert({ parentId: false, ...item, listId });
                }
            }
        });
    }

    deleteList(listId: ID) {
        this.delete({ listId });
    }

    getItems(listId: ID) {
        return this.find({ listId, parentId: false });
    }

    getItem(listId: ID, itemId: ID) {
        return this.findFirst({ id: itemId, listId });
    }

    getChilds(listId: ID, parentId: ID) {
        return this.find({ listId, parentId });
    }
}

export default new NaxOSListHandler();
