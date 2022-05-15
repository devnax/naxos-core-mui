import React from 'react'
import Modal from '../Modal'
import {AlertProps} from './types'
import AlertView from './AlertView'
export {AlertProps}

class Alert{
   open(id: string | number, options: AlertProps){
      Modal.open(`__ALERT_${id}__`, <AlertView {...options}/>, {
         opacity: .1,
         closeButton: false,
         props: {
            minWidth: 350
         }
      })
   }

   close(){
      Modal.close()
   }
}

export default new Alert()