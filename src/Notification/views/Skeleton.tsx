import React from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

const SkeletonView = () => {

   return (
      <Stack 
         direction="row" 
         spacing={1} 
         p={1}
      >
         <Box>
            <Skeleton variant='circular' width={40} height={40} sx={{borderRadius: 2}}/>
         </Box>
         <Box flex={1}>
            <Skeleton variant='text'/>
            <Skeleton variant='text' height={10} width={200}/>
            <Skeleton variant='text' height={10} width='90%'/>
         </Box>
      </Stack>
   )
}


export default ({length}: {length: number}) => {
   const items = []
   for(let i = 0; i < length; i++){
      items.push(<SkeletonView key={i}/>)
   }
   return <>{items}</>
}