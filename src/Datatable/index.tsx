import * as React from 'react';
import Navbar from './Navbar';
import Table from './Table';
import Box from '@mui/material/Box';
import { DataTableProps, PublicHandlerType } from './types';
import NavbarInfo from './NavbarInfo';
import { Component } from 'react';
import Handler from './Handler';

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


export class DataTableView extends Component<DataTableProps> {
    componentDidMount() {
        if (this.props.init) {
            this.props.init();
        }
    }

    render() {
        return (
            <Box {...this.props.sx}>
                <Navbar {...this.props} />
                <Table {...this.props} />
                {!this.props.hideFooter && (
                    <Box mt={1}>
                        <NavbarInfo {...this.props} />
                    </Box>
                )}
            </Box>
        );
    }
}
