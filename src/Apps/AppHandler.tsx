import { Store } from 'state-range'
import Alert from '../Alert'
import { AppProps, AppPropsStore } from './types'
import { AlertProps } from "../Alert";
import { SystemVars } from '../System';

class NaxOSApp extends Store<AppPropsStore>{

   create(options: AppProps) {
      if (!this.getById(options.id)) {
         this.insert({
            ...options
         })
      } else {
         throw new Error(`${options.id} App ID Already Exists!`)
      }
   }

   setCloseAlert(id: string, msg: boolean | Pick<AlertProps, "title" | "content">) {
      const app = this.getRunnedApp()
      if (app.id === id) {
         this.update({ closeAlert: msg }, { id })
      } else {
         throw new Error("Close Alert work whene app i running")
      }
   }

   run(id: string): string {
      const currentApp = this.getRunnedApp()
      if (id === currentApp.id) {
         return id
      }

      const processToRunApp = () => {
         if (typeof currentApp.onClose === 'function') {
            currentApp.onClose(currentApp.id)
         }

         const app = this.getById(id)
         if (typeof app?.onOpen === 'function') {
            app.onOpen(app.id)
         }
         SystemVars.set("App", { runAppId: id })
      }

      if (currentApp.closeAlert) {
         let alert_options: any = {}

         if (typeof currentApp.closeAlert === 'boolean') {
            alert_options = {
               title: "Are you sure?",
               content: "Do you want to close the app?"
            }
         } else {
            alert_options = currentApp.closeAlert
         }
         Alert.open("__APP_CLOSE_CONFIRM__", {
            ...alert_options,
            type: "warning",
            onClick: (ok) => {
               if (ok) {
                  processToRunApp()
               }
            }
         })
      } else {
         processToRunApp()
      }

      return id;
   }

   getRunnedApp() {

      const { runAppId } = SystemVars.get("App")
      if (runAppId) {
         const app = this.getById(runAppId)
         if (app) {
            return app
         }
      }
      return this.getApps()[0]
   }

   remove(id: string) {
      this.delete({ id })
   }

   getById(id: string) {
      return this.findFirst({ id })
   }

   getApps() {
      return this.findAll()
   }

   searchApp(query: string) {
      return this.find(`@where mode='normal' && name like ^${query}`)
   }
}

export default new NaxOSApp()