import React from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import BackIcon from '@mui/icons-material/ArrowBackRounded';
import IconButton from '@mui/material/IconButton'
import Handler from '../handler'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/SearchRounded';

const WidgetNav = () => {
   return (
      <Stack p={1} direction="row" justifyContent="space-between" alignItems="center">
         <Stack direction="row" gap={1} alignItems="center">
            <IconButton size="small" onClick={() => Handler.close()}>
               <BackIcon />
            </IconButton>
            <Typography variant="h6">Widgets</Typography>
         </Stack>
         <Box>
            <TextField
               placeholder='Search'
               size="small"
               onChange={(e: any) => {
                  Handler.setMeta("searchText", e.target.value)
               }}
               InputProps={{
                  endAdornment: <InputAdornment position="end">
                     <SearchIcon />
                  </InputAdornment>
               }}
            />
         </Box>
      </Stack >
   )
}

export default WidgetNav