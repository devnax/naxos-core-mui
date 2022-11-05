import React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Dropdown } from '../..';
import UploadingDropdown from './Dropdown';


const UploadingPanel = () => {
   return (
      <Stack direction="row">
         <Button
            size="large"
            color="primary"
            variant='contained'
            sx={{
               borderRadius: '100%',
               p: 0,
               width: 60,
               height: 60,
            }}
            onClick={(e: any) => {
               Dropdown.show(e.currentTarget, <UploadingDropdown />, {
                  placement: 'bottom-start'
               })
            }}
         >
            <UploadFileIcon fontSize="large" />
         </Button>
      </Stack>
   )
}

export default UploadingPanel