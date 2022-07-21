import React from 'react'
import Stack from '@mui/material/Stack'
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import MetaBox from '../../../components/MetaBox'


const General = () => {
   return (
      <MetaBox title="Thumbnail">
         <Stack
            height={170}
            p={2}
            justifyContent="center"
            alignItems="center"
            borderRadius={2}
            sx={{
               cursor: "pointer",
               transition: "all .3s",
               border: "2px dashed rgba(255,255,255, .1)",

            }}
         >
            <AddPhotoIcon
               sx={{
                  opacity: .4,
                  fontSize: 30
               }}
            />
         </Stack>
      </MetaBox>
   )
}

export default General