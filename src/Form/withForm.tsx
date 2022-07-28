import React, { FC, ComponentType, createElement, useState } from 'react'

export interface FormType<Fields> {
   set: <T extends keyof Fields>(name: T, value: Fields[T]) => void;
   get: <T extends keyof Fields>(name: T, def?: Fields[T]) => Fields[T] | void;
   getAll: () => Fields;
   delete: <T extends keyof Fields>(name: T) => Fields;
}

export interface DefaultProps<Fields> {
   form?: FormType<Fields>;
   validator?: any
}

export const withForm = <Fields extends {}>(Comp: ComponentType<any>) => {
   const Render = <P extends {}>(props: P & DefaultProps<Fields>) => {
      const [state, setState] = useState<Fields>({} as any)

      return createElement<P & DefaultProps<Fields>>(Comp, {
         ...props,
         form: {
            set: <T extends keyof Fields>(name: T, value: Fields[T]) => {
               setState({
                  ...state,
                  [name]: value
               })
            },

            get: <T extends keyof Fields>(name: T, def?: Fields[T]): Fields[T] | void => {
               if (state && state[name]) {
                  return state[name]
               }
               return def
            },
            getAll: () => {
               return state
            },
            delete: <T extends keyof Fields>(name: T) => {
               if (state[name]) {
                  delete state[name]
               }
            }
         } as FormType<Fields>
      })
   }
   return Render
}

export default withForm


interface Props {
   form: FormType<Fields>
}

interface Fields {
   name: string;
   email: string;
}

const Form: FC<Props> = (props) => {
   return <div>
      <TextField
         form={props.form}
         validator={validator}
         name="abc"
      />
   </div>
}


withForm<Fields>(Form)