import Handler from './AppHandler';
import { AppHandlerPublic } from './types';

const Apps: AppHandlerPublic = {
    create: Handler.create.bind(Handler),
    // run: Handler.run.bind(Handler),
    remove: Handler.remove.bind(Handler),
    // setCloseAlert: Handler.setCloseAlert.bind(Handler),
    // getRunnedApp: Handler.getRunnedApp.bind(Handler),
    getById: Handler.getById.bind(Handler),
    getApps: Handler.getApps.bind(Handler),
    searchApp: Handler.searchApp.bind(Handler)
};

export default Apps;
