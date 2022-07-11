import WidgetView from './views';
import Handler from './handler';
import { PublicHandler } from './types';

const Widget: PublicHandler = {
    create: Handler.create.bind(Handler),
    remove: Handler.remove.bind(Handler),
    getWidgets: Handler.getWidgets.bind(Handler),
    open: Handler.open.bind(Handler),
    close: Handler.close.bind(Handler)
};

export default Widget;
export { WidgetView };
