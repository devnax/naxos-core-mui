import { request } from 'http'
import React from 'react'
import { PublisherView } from '../../src/Post/Publisher'

const Post = () => {
   return (
      <PublisherView
         containerProps={{
            p: 2
         }}
         categories={[
            { id: 1, name: "IELTS" },
            { id: 2, name: "GED", parentId: 1 },
            { id: 3, name: "SAT", parentId: 1 },
            { id: 4, name: "GRE" },
            { id: 5, name: "TOEFL" },
            { id: 6, name: "GMAT" },
         ]}

         tags={[
            { value: "1", label: "IELTS" },
            { value: "2", label: "GED" },
            { value: "3", label: "SAT" },
            { value: "4", label: "GRE" },
            { value: "5", label: "TOEFL" },
            { value: "6", label: "GMAT" },
         ]}

         tabs={[
            { title: "Outline", content: <></> },
            { title: "Settings", content: <></> },
         ]}

         metaBoxes={[
            {
               sidebar: true,
               title: "Custom MetaBox",
               content: <div>Nice</div>
            }
         ]}
      />
   )
}

export default Post