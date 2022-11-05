import DataTable from "../../DataTable"

class ListFileHandler extends DataTable {

   constructor() {
      super()
      this.columns([
         {
            title: "Name",
            field: "name"
         },
         {
            title: "Size",
            field: "size"
         },
         {
            title: "Date",
            field: "date"
         }
      ])

      this.rows([
         { id: 1, name: "index.html", size: '20MB', date: '20, Nov 2022', },
         { id: 1, name: "style.css", size: "2MB", date: '12, Nov 2022', },
         { id: 1, name: "script.ts", size: "10MB", date: '02, Nov 2022', }
      ])

      this.setMeta("checkbox", true)
      this.setMeta("hideFooter", true)
      this.setMeta("searchBox", false)
      this.setMeta("pagination", {
         rowCount: 200,
         page: 1,
         perpage: 20
      })
   }
}


export default new ListFileHandler()