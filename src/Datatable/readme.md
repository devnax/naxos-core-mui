## Datatable

```js
import Datatable, {DatatableView} from 'admin/Datatable'
import {rows, columns} from 'admin/Datatable/demodata'



class Handler extends DataTable {

   constructor() {
      super()
      this.columns([
         {
            title: "Name",
            field: "name"
         },
         {
            title: "Email",
            field: "email"
         },
         {
            title: "Age",
            field: "age"
         }
      ])

      this.rows([
         { id: 1, name: "Naxrul Ahmed", email: "naxrul@gmail.com", age: "26" },
         { id: 1, name: "Devnax", email: "devnax@gmail.com", age: "30" }
      ])

      this.setMeta("checkbox", true)
      this.setMeta("hideFooter", true)
      this.setMeta("pagination", {
         rowCount: 200,
         page: 1,
         perpage: 20
      })
      this.setMeta("tabs", [
         { label: "All", value: "all" },
         { label: "Deactive", value: "deactive" },
         { label: "Active", value: "active" },
      ])
   }
}

const handler = new Handler

const App = () => {

   return (
      <DatatableView
         handler={handler}
         rowActions={(row: Row<Partial<RowProps>>) => DropdownArrayType[]}
         selectActions={(props: { selected: RowProps[] }) => ReactElement}
         filterMenu={() => ReactElement | DropdownArrayType[]}
      />
   )
}

```

### Methods

```js

DataTable.columns(cols: ColumnProps[])
DataTable.renderRow?(row: StoreRowProps & R): StoreRowProps & R;
DataTable.onChange?(): void;
DataTable.rows(rows: (R & RowProps)[])
DataTable.selectedRows()
DataTable.loading(is = true)
DataTable.isLoading()
DataTable.clearSelect()
DataTable.clearSearchText()

```
