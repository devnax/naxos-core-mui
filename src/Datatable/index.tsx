import React from 'react'
import Navbar from './Navbar'
import Table from './Table'
import Box from '@mui/material/Box'
import { DataTableProps, RowProps, ColumnProps } from './types'
import NavbarInfo from './NavbarInfo'
import { Component } from 'react'
import Handler from './Handler'
import { noDispatch } from 'state-range'
import { Row } from 'state-range/src/types'


class DataTableView extends Component<DataTableProps>{

   actionSet = false

   static setColumns(tableId: string, columns: ColumnProps[]): ColumnProps[] {
      return Handler.columns(tableId, columns)
   }

   static setRows(tableId: string, rows: RowProps[]) {
      return Handler.rows(tableId, rows)
   }

   static addRow(tableId: string, row: RowProps) {
      Handler.addRow(tableId, row)
   }

   static getRows(tableId: string) {
      return Handler.rows(tableId)
   }

   static find(tableId: string, where: object): Row<Partial<RowProps>>[] {
      return Handler.find({ tableId, ...where })
   }

   static getRow(tableId: string, id: number | string) {
      return Handler.findFirst({ tableId, id })
   }

   static deleteRow(tableId: string, rowId: number | string) {
      return Handler.deleteRow(tableId, rowId)
   }

   static updateRow(tableId: string, rowId: number | string, row: Partial<RowProps>) {
      return Handler.updateRow(tableId, rowId, row)
   }

   static updateRows(tableId: string, row: Partial<RowProps>, where: Partial<RowProps>) {
      return Handler.update({ ...row, tableId }, { ...where, tableId })
   }

   static loading(tableId: string, is?: boolean) {
      if (is !== undefined) {
         Handler.metaState(tableId, { loading: is }, 'loading')
      }
      return Handler.metaState(tableId, null, 'loading')
   }

   static unselecRows(tableId: string) {
      Handler.update({ checked: false }, { checked: true, tableId })
   }

   static clearSearchText(tableId: string) {
      Handler.metaState(tableId, { searchText: '' }, 'loading')
   }

   componentWillUnmount() {
      noDispatch(() => {
         Handler.delete({ tableId: this.props.id })
         Handler.deleteMeta(`${this.props.id}_metastate`)
      })
   }

   componentDidMount() {
      if (this.props.init) {
         this.props.init()
      }
   }


   render() {
      return (
         <Box
            bgcolor="background.paper"
            borderRadius={2}
            p={1}
         >
            <Navbar {...this.props} />
            <Table {...this.props} />
            {
               !this.props.hideFooter && <Box mt={1}><NavbarInfo {...this.props} /></Box>
            }
         </Box>
      )
   }
}

export default DataTableView
