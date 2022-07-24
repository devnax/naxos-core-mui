import React from 'react'
import TextField from '@mui/material/TextField'
import MetaBox from '../../../MetaBox'
import { withStore } from 'state-range'
import { CompProps } from '../types'

const Excerpt = ({ handler }: CompProps) => {
   const state = handler.getMeta("state")
   return (
      <MetaBox title="Sort Content">
         <TextField
            value={state?.excerpt}
            onChange={(e: any) => {
               handler.setState({ excerpt: e.target.value })
            }}
            fullWidth
            multiline
            minRows={2}
         />
      </MetaBox>
   )
}

export default withStore(Excerpt, ({ handler }) => {
   const state = handler.getMeta("state")
   return [state?.excerpt?.length]
})