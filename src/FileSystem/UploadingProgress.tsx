import React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Dropdown } from '..';
import UploadingDropdown from './components/Dropdown';


const UploadingProgress = () => {
   return (
      <Stack direction="row">
         <Button
            size="large"
            color="primary"
            variant='contained'
            sx={{
               borderRadius: 50,
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

export default UploadingProgress