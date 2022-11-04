import DataTable from "../DataTable"

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
         { id: 1, name: "12.png", size: '12MB', date: '12, Nov 20022', },
         { id: 1, name: "40.pdf", size: "90KB", date: '12, Nov 20022', }
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