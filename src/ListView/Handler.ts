import { dispatch, noDispatch, Store } from 'state-range'
import { ItemProps } from './types'

class NaxOSCoreListVIew extends Store<ItemProps> {

   setList(id: string, items: Omit<ItemProps, 'viewId'>[]) {
      noDispatch(() => {
         this.delete({ viewId: id })
         for (let item of items) {
            this.insert({ ...item, active: false, viewId: id })
         }

         if (items.length) {
            this.renderView(id, this.find({ viewId: id })[0]._id)
         }
      })

      this.dispatch()
   }

   renderView(id: string, _id: string) {
      const exists = this.findById(_id)

      if (exists) {
         dispatch(() => {
            this.update({ active: false }, { active: true, viewId: id })
            this.update({ active: true }, { viewId: id, _id })
         })
      }
   }

   getView(id: string) {
      const view = this.findFirst({ viewId: id, active: true })
      if (!view) {
         return this.find({ viewId: id })[0] || {}
      }
      return view
   }

   mobileSidebarShow(toggle?: boolean): boolean {
      if (toggle !== undefined) {
         this.setMeta('mobile_sidebar_show', toggle)
      }
      return this.getMeta('mobile_sidebar_show', true)
   }
}


const handler = new NaxOSCoreListVIew()

interface PublicHandlerType {
   setList: (id: string, items: Omit<ItemProps, 'viewId'>[]) => void
}

export const PublicHandler: PublicHandlerType = {
   setList: handler.setList.bind(handler)
}


export default handler