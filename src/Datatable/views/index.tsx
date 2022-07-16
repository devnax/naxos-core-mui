import * as React from 'react';
import Navbar from './Navbar';
import Table from './Table';
import Box from '@mui/material/Box';
import { DataTableProps } from '../types';
import NavbarInfo from './NavbarInfo';
import { withStore } from 'state-range';

const DataTableView = (props: DataTableProps) => {
    return (
        <Box>
            <Navbar {...props} />
            <Table {...props} />
            {!props.handler.getMeta('hideFooter') && (
                <Box mt={1}>
                    <NavbarInfo {...props} />
                </Box>
            )}
        </Box>
    );
};

export default withStore(DataTableView, (props) => [props.handler.getMeta('hideFooter')]);
