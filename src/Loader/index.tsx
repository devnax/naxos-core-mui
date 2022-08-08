import React, { ReactElement, ReactNode } from 'react'
import Stack, { StackProps } from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'


export type LoaderProps = StackProps & {
   loading?: boolean;
   children: ReactElement | ReactNode
}


const Loader: React.FC<LoaderProps> = ({ loading, children, ...props }) => {
   return (
      <Stack
         sx={{
            position: loading ? 'relative' : "initial"
         }}
         {...props}
      >
         {
            loading && <Stack
               position="absolute"
               top={0}
               left={0}
               bottom={0}
               right={0}
               zIndex={999}
               bgcolor="rgba(0,0,0,.2)"
               justifyContent="center"
               alignItems="center"
            >
               <CircularProgress />
            </Stack>
         }
         {children}
      </Stack>
   )
}

export default Loader