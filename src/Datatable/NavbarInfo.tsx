import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import NavAction from './NavbarAction'
import { DataTableProps } from './types'
import TablePagination from '@mui/material/TablePagination'
import Box from '@mui/material/Box'
import { withStore } from 'state-range'
import Handler from './Handler'

const NavbarInfo = (props: DataTableProps) => {
   const { id, rowCount, perPageOptions, hidePagination, hideRowPerPage, onPaginationChange } = props
   const selectedItems = Handler.selectedItems(id)
   const rows = Handler.rows(id)
   const pagination = Handler.metaState(id, null, 'pagination')

   const perpage = pagination.perPage ? pagination.perPage : (perPageOptions ? perPageOptions[0] : 25)

   if (!rows.length) {
      return <></>
   }
   return (
      <Stack
         p={1}
         direction={{ xs: "column", md: "row" }}
         justifyContent="space-between"
         alignItems="center"
         position="relative"
         height={50}
      >
         {
            !selectedItems.length && <>

               <Typography variant="body2" >Showing {rows.length} items</Typography>
               {
                  (!hidePagination && rowCount) && <TablePagination
                     component={Box}
                     count={rowCount}
                     rowsPerPage={perpage}
                     rowsPerPageOptions={hideRowPerPage ? [] : perPageOptions}
                     page={pagination.page || 0}
                     onPageChange={(_e: any, cpage) => {
                        Handler.metaState(id, {
                           pagination: { ...Handler.metaState(id, null, 'pagination'), page: cpage }
                        })
                        if (onPaginationChange) {
                           onPaginationChange(Handler.metaState(id, null, 'pagination'))
                        }
                     }}

                     onRowsPerPageChange={(e: any) => {
                        Handler.metaState(id, {
                           pagination: { ...Handler.metaState(id, null, 'pagination'), perPage: e.target.value }
                        })

                        if (onPaginationChange) {
                           onPaginationChange(Handler.metaState(id, null, 'pagination'))
                        }
                     }}

                  />
               }
            </>
         }



         {
            selectedItems.length ? <NavAction {...props} selectedItems={selectedItems} /> : ''
         }
      </Stack>
   )
}
export default withStore(NavbarInfo, ({ id }) => {
   return [Handler.selectedItems(id), Handler.rows(id).length, Object.values(Handler.metaState(id, null, 'pagination'))]
})