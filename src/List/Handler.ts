import { dispatch, Store } from "state-range";
import { ID, ListItemProps, ListItemStoreProps } from './types'

class NaxOSListHandler extends Store<ListItemStoreProps> {
   addItems(listId: ID, items: ListItemProps[]) {
      const exists = this.count({ listId })
      if (exists) {
         throw new Error(`List Id Already Exists ${listId}`)
      }
      dispatch(() => {
         for (let item of items) {
            this.insert({ parentId: false, ...item, listId })
         }
      })
   }

   deleteList(listId: ID) {
      this.delete({ listId })
   }

   getItems(listId: ID) {
      return this.find({ listId, parentId: false })
   }

   getChilds(listId: ID, parentId: ID) {
      return this.find({ listId, parentId })
   }
}

export default new NaxOSListHandler