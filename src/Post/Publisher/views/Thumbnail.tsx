import React from 'react'
import Stack from '@mui/material/Stack'
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import MetaBox from '../../../components/MetaBox'
import Handler from '../handler'
import { withStore } from 'state-range';

const Thumbnail = () => {

   const state = Handler.getMeta("state")
   const onThumbnailClick = Handler.getMeta("onThumbnailClick")
   const thumbnail = state?.thumbnail

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
               border: !thumbnail ? "2px dashed rgba(255,255,255, .1)" : "",
               backgroundImage: `url(${thumbnail})`,
               backgroundRepeat: "no-repeat",
               backgroundSize: "cover",
               backgroundPosition: "center"

            }}
            onClick={() => onThumbnailClick && onThumbnailClick()}
         >
            {
               !thumbnail && <AddPhotoIcon
                  sx={{
                     opacity: .4,
                     fontSize: 30
                  }}
               />
            }
         </Stack>
      </MetaBox>
   )
}

export default withStore(Thumbnail, () => {
   const state = Handler.getMeta("state")
   return [state?.thumbnail]
})