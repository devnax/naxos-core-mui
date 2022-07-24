import React from 'react'
import { PublisherView } from '../../src/Post/Publisher'
import handler from './handler'

const Post = () => {
   return (
      <PublisherView
         containerProps={{
            p: 2
         }}
         handler={handler}
      />
   )
}

export default Post