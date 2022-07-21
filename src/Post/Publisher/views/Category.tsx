import React from 'react'
import Box from '@mui/material/Box'
import MetaBox from '../../../components/MetaBox'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Scrollbar from '../../../components/Scrollbar'
import TextField from '@mui/material/TextField'

const Category = () => {
   return (
      <MetaBox title="Category" >
         <Scrollbar style={{ flex: 1, height: "auto", maxHeight: 200, padding: 8 }}>
            <FormGroup>
               <FormControlLabel control={<Checkbox size="small" sx={{ p: .5 }} />} label="IELTS" />
               <FormControlLabel control={<Checkbox size="small" sx={{ p: .5 }} />} label="GED" />
               <FormControlLabel control={<Checkbox size="small" sx={{ p: .5 }} />} label="SAT" />
               <FormControlLabel control={<Checkbox size="small" sx={{ p: .5 }} />} label="TOEFL" />
               <FormControlLabel control={<Checkbox size="small" sx={{ p: .5 }} />} label="GRE" />
               <FormControlLabel control={<Checkbox size="small" sx={{ p: .5 }} />} label="GMAT" />
               <FormControlLabel control={<Checkbox size="small" sx={{ p: .5 }} />} label="IELTS" />
               <FormControlLabel control={<Checkbox size="small" sx={{ p: .5 }} />} label="GED" />
               <FormControlLabel control={<Checkbox size="small" sx={{ p: .5 }} />} label="SAT" />
               <FormControlLabel control={<Checkbox size="small" sx={{ p: .5 }} />} label="TOEFL" />
               <FormControlLabel control={<Checkbox size="small" sx={{ p: .5 }} />} label="GRE" />
               <FormControlLabel control={<Checkbox size="small" sx={{ p: .5 }} />} label="GMAT" />
            </FormGroup>
         </Scrollbar>
         <Box py={1}>
            <TextField
               fullWidth
               size="small"
               placeholder='search..'
            />
         </Box>
      </MetaBox>
   )
}

export default Category