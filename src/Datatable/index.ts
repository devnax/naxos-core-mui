import { PublicHandlerType } from './types';
import Handler from './Handler';
import DataTableView from './views';

export { DataTableView }

const PublicHandler: PublicHandlerType = {
    setColumns: Handler.setColumns.bind(Handler),
    setRows: Handler.setRows.bind(Handler),
    setRow: Handler.setRow.bind(Handler),
    getRows: Handler.getRows.bind(Handler),
    findRows: Handler.findRows.bind(Handler),
    getRow: Handler.getRow.bind(Handler),
    deleteRow: Handler.deleteRow.bind(Handler),
    updateRow: Handler.updateRow.bind(Handler),
    loading: Handler.loading.bind(Handler),
    clearSelect: Handler.clearSelect.bind(Handler),
    clearSearchText: Handler.clearSearchText.bind(Handler),
}

export default PublicHandler

