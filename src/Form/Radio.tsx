import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import MuiRadio, { RadioProps } from '@mui/material/Radio';
import { FormTypes } from './useForm'
import { any, SchemaFactory } from '../Validex'
import Label from './Label'

type Value = string | number | boolean | null

interface Item {
   label: string;
   value: Value;
}

type Props = Omit<RadioProps, 'form'> & {
   form?: FormTypes<any>;
   schema?: (s: any) => typeof SchemaFactory
   label?: string;
   name: string;
   title?: string;
   value: Value;
   defaultValue?: Value;
   items?: Item[];
   vertical?: boolean;
   disableError?: boolean;
   hide?: boolean;
   require?: boolean;
}


const Item = ({ form, name, value, label, ...props }: Props) => {
   return (
      <FormControlLabel
         sx={{ userSelect: "none" }}
         control={<MuiRadio
            name={name}
            value={value}
            checked={form?.get(name) === value}
            onClick={() => {
               form?.set(name, value)
               form?.removeError(name)
            }}
            sx={{ p: .5 }}
            {...props}
         />}
         label={label}
      />
   )
}

export default function Radio({ form, name, value, defaultValue, label, title, items, vertical, schema, disableError, hide, require, ...props }: Props) {

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
   }, [form?.observe().data])

   if (hide) {
      return <></>
   }

   const error = form?.getError(name)



   return <>
      {
         title && <Box>
            <Label require={require} error={!disableError && error ? true : false}>{title}</Label>
            {error && <Label error={true} fontSize={13} fontWeight={400}>{error}</Label>}
         </Box>
      }
      <FormControl sx={{ flexDirection: vertical ? "row" : "column", pl: 1 }}>
         <Item
            form={form}
            name={name}
            value={value}
            label={label}
            {...props}
         />
         {
            items && items.map(item => <Item
               key={item.label + "_redio"}
               form={form}
               name={name}
               value={item.value}
               label={item.label}
               {...props}
            />)
         }
      </FormControl>
   </>
}
