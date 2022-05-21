## Datatable

```js
import Datatable from 'naxos-core/Datatable'


const App = () => {

   return (
      <Datatable 
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