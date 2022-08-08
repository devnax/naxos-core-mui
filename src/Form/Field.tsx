import React, { FC } from 'react'
import Grid, { GridProps, GridSize } from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

export type FieldProps = GridProps & {
   size?: GridSize;
   title?: string;
   divider?: true;
   hide?: boolean
}

const Field: FC<FieldProps> = ({ children, size, title, divider, hide, ...gridProps }) => {

   const props: any = {}
   if (!gridProps.container) {
      props.p = .7
      props.xs = 12
      props.sm = size || 12
      props.item = true
   } else {
      props.spacing = 2
      props.py = 1.5

   }

   if (hide) {
      return <></>
   }


   return (
      <>
         {title && <Typography variant="h5" fontWeight={500} sx={{ opacity: .5, mb: 3, mt: 6 }}>{title}</Typography>}
         <Grid
            {...props}
            {...gridProps}
         >

            {children}
         </Grid>
         {divider && <Divider sx={{ my: 4 }} />}
      </>
   )
}

export default Field