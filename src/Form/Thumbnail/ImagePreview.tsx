import React from 'react'
import Avatar from '@mui/material/Avatar'
import { ThumbnailProps } from './types'

const ImagePreview = ({ value, type, height, width }: ThumbnailProps) => value && type === 'image' ? <Avatar
   variant="rounded"
   src={value}
   sx={{
      width,
      height,
   }}
/> : <></>

export default ImagePreview