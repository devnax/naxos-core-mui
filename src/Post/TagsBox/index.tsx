import React from 'react'
import TextField from '../../Form/TextField'
import Select, { SelectItemProps } from '../../Form/Select'
import MetaBox from '../../MetaBox'
import { FormTypes } from '../../Form/useForm';


interface TagsProps {
   name: string;
   form: FormTypes<any>;
   options: SelectItemProps[];
   onCreate?: (text: string) => Promise<number>
}

const TagBox = ({ name, form, options, onCreate }: TagsProps) => {
   const formState = form.getState()
   return (
      <MetaBox title="Tags" >
         <Select
            sx={{ mb: 2 }}
            multiple
            name={name}
            options={options}
            form={form}
         />
         {
            onCreate && <TextField
               name="new_tags"
               value={formState.new_tag || ''}
               onChange={(e: any) => {
                  form.setState({ ...form.getState(), new_tag: e.target.value })
               }}
               onKeyDown={async (e: any) => {
                  if (e.keyCode === 13) {
                     const state = form.getState()
                     form.setState({ ...state, new_tag: '' })
                     const id = await onCreate(state.new_tag)
                     form.set(name, [...form.get(name, []), id])
                  }
               }}
            />
         }

      </MetaBox>
   )
}

export default TagBox