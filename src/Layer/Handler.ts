import { ReactElement } from 'react'
import {Store} from 'state-range'
import {LayerOptionProps} from './types'


class LayerHandler extends Store{

   open(id: string | number, content: ReactElement, options?: LayerOptionProps){
      if(content && !this.findFirst({id})){
         this.update({active: false}, {active: true})
         this.insert({
            ...(options || {}),
            id,
            content,
            active: true
         })
      }
   }
   
   close(id?: string){
      const layer = id ? this.findFirst({id}) : this.findFirst({active: true})
      if(layer){
         this.delete(layer._id)
         if(layer.active){
            const layers = this.findAll()
            if(layers.length){
               const last: any = layers[layers.length -1]
               this.update({active: true}, last._id)
            }
         }
      }
   }

   closeAll(){
      this.deleteAll()
   }

   isOpened(id: string | number): boolean{
      const layer = this.findFirst({id})
      return layer ? true : false
   }

}


export default new LayerHandler