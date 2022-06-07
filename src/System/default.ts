import { SystemProps } from './types'

const defaultValues: SystemProps = {
   Desktop: {
      pinedWidgets: []
   },
   Dock: {
      pinedApps: [
         "Snapchat",
         "white-bord",
         "chat"
      ],
      autoHide: false
   }
}

export default defaultValues