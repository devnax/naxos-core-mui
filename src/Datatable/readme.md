## Datatable

```js
import Datatable, {DatatableView} from 'admin/Datatable'
import {rows, columns} from 'admin/Datatable/demodata'


const App = () => {

   return (
      <DatatableView
         id="tableid"
         checkbox
         onSearch={(text) => {

         }}
         hideSearchbar
         onRenderRow={(row: Row<Partial<RowProps>>) => Row<Partial<RowProps>>}
         rowActions={(row: Row<Partial<RowProps>>) => ReactElement | DropdownArrayType[]}
         selectNavActions={(props: { selected: RowProps[] }) => ReactElement}
         filterMenu={() => ReactElement}
         tabs={TabProps[]}

         // Pagination
         rowCount={number}// total length of items
         perPageOptions={number[]}
         hidePagination={boolean}
         hideRowPerPage={boolean}
         onPaginationChange={(info: PaginationProps) => void}
         hideFooter={boolean}

         // load it with useEffect
         init={() => {
            Datatable.setColumns('tableid', [
               {
                  field: string,
                  title: string,
                  ...TableCellProps
               }
            ])

            Datatable.setRows('tableid', [
               {
                  id: number, // required
                  ...
               }
            ])


            Datatable.addRow('tableid', {
               id: number, // required
               ...
            })

            const rows = Datatable.getRows('tableid')
            const rows = Datatable.deleteRow('tableid', rowId)
            Datatable.unselecRows('tableid')
            Datatable.clearSearchText('tableid')
            Datatable.updateRow('tableid', rowId, {...row})

            Datatable.loading('tableid', boolean) // loading the table
         }}

      />
   )
}

```

### Methods

```js

DataTable.setColumns(tableId: string, columns: ColumnProps[]): ColumnProps[]
DataTable.setRows(tableId: string, rows: RowProps[])
DataTable.setRow(tableId: string, row: RowProps)
DataTable.getRows(tableId: string): RowProps[]
DataTable.findRows(tableId: string, where: object): Row<Partial<RowProps>>[]
DataTable.getRow(tableId: string, id: number | string): RowProps
DataTable.deleteRow(tableId: string, rowId: number | string)
DataTable.updateRow(tableId: string, rowId: number | string, row: Partial<RowProps>)
DataTable.loading(tableId: string, is?: boolean)
DataTable.clearSelect(tableId: string): RowProps[]
DataTable.clearSearchText(tableId: string)

```
