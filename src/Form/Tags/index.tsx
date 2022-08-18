import React, { useEffect } from 'react'
import Select, { SelectItemProps } from '../../Form/Select'
import { FormTypes } from '../../Form/useForm';


export interface TagsProps {
   name: string;
   form: FormTypes<any>;
   label?: string;
   options?: SelectItemProps[];
   defaultValue?: (SelectItemProps['value'])[]
}

const PopperComponent = () => <></>

const Tags = ({ name, label, form, options, defaultValue }: TagsProps) => {
   useEffect(() => {
      if (defaultValue) {
         form.set(name, defaultValue)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const formState = form.getState()
   const props: any = {}

   if (options) {
      props.PopperComponent = PopperComponent
   }

   const createdItems = formState.tagsCreated || []

   return (
      <>
         <Select
            sx={{ mb: 2 }}
            multiple
            name={name}
            loading={false}
            options={[...createdItems, ...(options || [])]}
            form={form}
            label={label}
            limitTags={5}
            inputProps={{
               onKeyDown: (e: any) => {
                  if (e.keyCode === 13 && e.target.value) {
                     form.setState({
                        ...form.getState(),
                        tagsCreated: [...createdItems, { label: e.target.value, value: e.target.value }]
                     })
                     form.set(name, [...form.get(name, []), e.target.value])
                  }
               }
            }}
            {...props}
         />

      </>
   )
}

export default Tags