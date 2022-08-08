import React from 'react'
import TextField from '@mui/material/TextField'
import { FormTypes } from './useForm'
import Label from './Label'
import { any, SchemaFactory } from '../Validex'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';

export type DatePickerProps = Omit<TimePickerProps<any, any>, "renderInput" | "onChange" | "value"> & {
   form?: FormTypes<any>;
   name: string;
   defaultValue?: string;
   require?: boolean;
   schema?: (s: any) => typeof SchemaFactory;
   disableError?: boolean;
   hide?: boolean
}


const DatePicker = ({ form, name, require, label, defaultValue, schema, disableError, hide, ...props }: DatePickerProps) => {


   React.useEffect(() => {
      if (!form?.get(name)) {
         if (defaultValue) {
            form?.set(name, defaultValue)
         } else {
            form?.set(name, null)
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   React.useEffect(() => {
      if (schema) {
         form?.setSchema(name, schema(any().field(name)))
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [schema?.toString()])

   if (hide) {
      return <></>
   }

   const error = form?.getError(name)
   const inputProps: any = {}
   if (disableError !== false && error) {
      inputProps.helperText = error
      inputProps.error = error ? true : false
      inputProps.onFocus = () => form?.removeError(name)
   }

   return (
      <LocalizationProvider dateAdapter={AdapterMoment}>
         {label && <Label error={!disableError && error ? true : false} require={require} htmlFor={name}>{label}</Label>}
         <TimePicker
            value={form?.get(name, null)}
            onChange={(newValue: any) => {
               form?.set(name, newValue?.format())
            }}
            renderInput={(params: any) => <TextField
               {...params}
               size="small"
               fullWidth
               id={name}
               {...inputProps}
            />}
            {...props}
         />
      </LocalizationProvider>
   )
}

export default DatePicker