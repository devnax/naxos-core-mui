import * as React from 'react';
import Navbar from './Navbar';
import Table from './Table';
import Box from '@mui/material/Box';
import { DataTableProps } from '../types';
import NavbarInfo from './NavbarInfo';

export default class DataTableView extends React.Component<DataTableProps> {
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
