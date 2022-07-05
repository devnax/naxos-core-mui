import ListHandler from './Handler';
import { PublicHandlerInterface } from './types';
import ListView from './views/ListView';

export { ListView };

const Handler: PublicHandlerInterface = {
    addItems: ListHandler.addItems.bind(ListHandler),
    getItems: ListHandler.getItems.bind(ListHandler),
    getChilds: ListHandler.getChilds.bind(ListHandler),
    deleteList: ListHandler.deleteList.bind(ListHandler)
};

export default Handler;
