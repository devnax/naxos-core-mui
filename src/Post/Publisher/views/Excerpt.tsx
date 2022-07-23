import React from 'react'
import TextField from '@mui/material/TextField'
import MetaBox from '../../../MetaBox'
import { withStore } from 'state-range'
import Handler from '../handler'
const Excerpt = () => {
   const state = Handler.getMeta("state")
   return (
      <MetaBox title="Sort Content">
         <TextField
            value={state?.excerpt}
            onChange={(e: any) => {
               Handler.setState({ excerpt: e.target.value })
            }}
            fullWidth
            multiline
            minRows={2}
         />
      </MetaBox>
   )
}

export default withStore(Excerpt)