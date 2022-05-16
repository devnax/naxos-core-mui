import { ReactElement } from 'react'
import { Store } from 'state-range'
import { LayerOptionProps } from './types'


class LayerHandler extends Store {

   open(id: string | number, content: ReactElement, options?: LayerOptionProps) {
      if (content && !this.findFirst({ id })) {

         const isStable = this.findFirst({ stable: true })

         if (!options?.stable && !isStable) {
            this.update({ active: false }, { active: true })
         }

         this.insert({
            ...(options || {}),
            id,
            content,
            active: true
         })
      }
   }

   close(id?: string) {
      let layer: any = null
      if (id) {
         const find = this.findFirst({ id })
         if (find) {
            layer = find
         }
      } else {
         const find = this.find({ active: true })
         if (find.length) {
            layer = find[find.length - 1]
         }
      }
      if (layer) {
         this.delete(layer._id)
         const existsActive = this.find({ active: true })
         if (layer.active && !existsActive.length) {
            const layers = this.findAll()
            if (layers.length) {
               const last: any = layers[layers.length - 1]
               this.update({ active: true }, last._id)
            }
         }
      }
   }

   closeAll() {
      this.deleteAll()
   }

   isOpened(id: string | number): boolean {
      const layer = this.findFirst({ id })
      return layer ? true : false
   }

}


export default new LayerHandler