import React, {ReactElement} from 'react'
import { ModalOptionsProps } from './types'
import Layer from '../Layer'
import ModalView from './ModalView'
export * from './types'


class ModalHandler{
   open(id: string | number, content: ReactElement, options?: ModalOptionsProps){
      Layer.open(`__MODAL_${id}__`, <ModalView content={content} {...options}/>, {
         animation: options?.animation || "zoom",
         opacity: options?.opacity || .5
      })
   }

   close(){
      Layer.close()
   }

   isOpened(id: string | number): boolean{
      return Layer.isOpened(`__MODAL_${id}__`)
   }
}

export default new ModalHandler()