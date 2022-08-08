import React, { useMemo } from 'react'
import TextField from '../../../Form/TextField'

import MetaBox from '../../../MetaBox'
import { CompProps } from '../types'

const Excerpt = ({ form }: CompProps) => {
   return useMemo(() => ((
      <MetaBox title="Sort Content">
         <TextField
            name="excerpt"
            form={form}
            fullWidth
            multiline
            minRows={2}
         />
      </MetaBox>
   )), [form.get('excerpt')])
}

export default Excerpt