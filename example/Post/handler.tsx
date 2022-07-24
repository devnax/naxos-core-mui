import * as React from 'react'
import { PublisherHandler } from '../../src/Post/Publisher'


class Handler extends PublisherHandler {

   constructor() {
      super()

      this.setMeta("title", "Add New Post")

      this.setMeta("categories", [
         { id: 1, title: "IELTS" },
         { id: 2, title: "GED" },
         { id: 3, title: "SAT" },
         { id: 4, title: "GRE" },
         { id: 5, title: "TOEFL" },
         { id: 6, title: "GMAT" },
      ])
      this.setMeta("tags", [
         { id: 1, title: "IELTS" },
         { id: 2, title: "GED" },
         { id: 3, title: "SAT" },
         { id: 4, title: "GRE" },
         { id: 5, title: "TOEFL" },
         { id: 6, title: "GMAT" },
      ])

      this.setMeta("tabs", [
         { title: "Outline", content: <></> },
         { title: "Settings", content: <></> },
      ])

      this.setMeta("metaBoxes", [
         {
            sidebar: true,
            title: "Custom MetaBox",
            content: <div>Nice</div>
         }
      ])
   }
}

export default new Handler