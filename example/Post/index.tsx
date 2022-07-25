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
            { id: 1, title: "IELTS" },
            { id: 2, title: "GED" },
            { id: 3, title: "SAT" },
            { id: 4, title: "GRE" },
            { id: 5, title: "TOEFL" },
            { id: 6, title: "GMAT" },
         ]}

         tags={[
            { id: 1, title: "IELTS" },
            { id: 2, title: "GED" },
            { id: 3, title: "SAT" },
            { id: 4, title: "GRE" },
            { id: 5, title: "TOEFL" },
            { id: 6, title: "GMAT" },
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