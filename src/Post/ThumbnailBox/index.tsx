import React from 'react'
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import MetaBox from '../../MetaBox'
import Avatar from '../../Form/Avatar'
import { FormTypes } from '../../Form/useForm'


interface ThumbnailProps {
   name: string;
   form: FormTypes<any>;
   onClick?: Function
}

const Thumbnail = ({ name, form, onClick }: ThumbnailProps) => {
   return <MetaBox title="Thumbnail">
      <Avatar
         name={name}
         form={form}
         icon={<AddPhotoIcon />}
         borderRadius={1}
         editIcon={false}
         width="100%"
         height={200}
         badgeProps={{
            sx: {
               width: '100%',
               height: 200
            }
         }}
         onClick={() => {
            onClick && onClick()
         }}
      />
   </MetaBox>
}

export default Thumbnail