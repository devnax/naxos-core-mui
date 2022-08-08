import React, { FC, HTMLAttributes, ReactElement, ReactNode, SyntheticEvent } from 'react'
import Loader, { LoaderProps } from '../Loader'

export type FormProps = LoaderProps & {
   children: ReactElement | ReactNode;
   formProps?: HTMLAttributes<HTMLFormElement>;
   includeForm?: false;
   onSubmit?: (e: SyntheticEvent<HTMLFormElement>) => void;
}


const HTMLForm: FC<FormProps> = ({ children, formProps, onSubmit }) => <form
   {...formProps}
   onSubmit={onSubmit}
>{children}</form>

const Form: FC<FormProps> = ({ children, onSubmit, includeForm, formProps, ...boxProps }) => {
   return (
      <Loader
         borderRadius={2}
         p={3}
         bgcolor="background.paper"
         {...boxProps}
      >
         {
            includeForm !== false ? <HTMLForm onSubmit={onSubmit} formProps={formProps}>{children}</HTMLForm> : children
         }
      </Loader>
   )
}

export default Form
