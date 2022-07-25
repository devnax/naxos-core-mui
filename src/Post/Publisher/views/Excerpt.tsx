import React, { useMemo } from 'react'
import TextField from '@mui/material/TextField'
import MetaBox from '../../../MetaBox'
import { CompProps } from '../types'

const Excerpt = ({ state, updateState }: CompProps) => {
   return useMemo(() => ((
      <MetaBox title="Sort Content">
         <TextField
            value={state?.excerpt}
            onChange={(e: any) => {
               updateState({ excerpt: e.target.value })
            }}
            fullWidth
            multiline
            minRows={2}
         />
      </MetaBox>
   )), [state.excerpt])
}

export default Excerpt