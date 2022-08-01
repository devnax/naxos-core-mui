import * as React from 'react'
import DrawerView, { DrawerProps } from "./DrawerView"
import Layer from '../Layer'

class DrawerHandler {
   open(props?: DrawerProps) {
      Layer.open("OS_DRAWER", <DrawerView {...props} />, {
         closeButton: false,
         opacity: .5,
         blur: 2,
         animation: 'fadeInLeft'
      })
   }

   close() {
      Layer.close("OS_DRAWER")
   }
}

export default new DrawerHandler