import React from 'react'
import Input, { TextFieldProps as TP } from '@mui/material/TextField'
import { ValidField } from 'react-validex'

export type TextFieldProps = TP & {
   validator?: any;
   checkWhenChange?: true;
}


const TextField = () => {
   return (
      <ValidField

      >
         <Input
            fullWidth
         />
      </ValidField>
   )
}

export default TextField