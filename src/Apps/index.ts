import AppHandler from './AppHandler'
import { AppHandlerPublic } from './types'

const AppHandlerPublic: AppHandlerPublic = {
   create: AppHandler.create.bind(AppHandler),
   run: AppHandler.run.bind(AppHandler),
   remove: AppHandler.remove.bind(AppHandler),
   setCloseAlert: AppHandler.setCloseAlert.bind(AppHandler),
   getRunnedApp: AppHandler.getRunnedApp.bind(AppHandler),
   getById: AppHandler.getById.bind(AppHandler),
   getApps: AppHandler.getApps.bind(AppHandler),
   searchApp: AppHandler.searchApp.bind(AppHandler)
}

export default AppHandlerPublic