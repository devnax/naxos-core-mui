import React, { FC } from 'react'
import Grid, { GridProps, GridSize } from '@mui/material/Grid'

export type FieldProps = GridProps & {
   size?: GridSize;
}

const Field: FC<FieldProps> = ({ children, size, ...gridProps }) => {

   if (!gridProps.container) {
      gridProps.p = 1.5
      gridProps.md = size || 12
   }

   return (
      <Grid
         xs={12}
         {...gridProps}
      >
         {children}
      </Grid>
   )
}

export default Field