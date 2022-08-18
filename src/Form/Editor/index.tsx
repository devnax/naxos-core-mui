import React, { FC, useEffect, Suspense } from 'react';
import 'suneditor/dist/css/suneditor.min.css';
import { SunEditorReactProps } from "suneditor-react/dist/types/SunEditorReactProps"
import { FormTypes } from '../useForm';
import configs from './config';
import Box from '@mui/material/Box'

const SunEditor = React.lazy(() => import('suneditor-react'));

type SunEditorProps = Partial<Omit<SunEditorReactProps, "onChange">>

export interface EditorProps extends SunEditorProps {
   name: string;
   form?: FormTypes<any>;
   defaultValue?: string;
   value?: string;
   onChange?: (content: string) => void;
}


const Editor: FC<EditorProps> = ({ name, form, value, onChange, defaultValue, ...props }) => {
   useEffect(() => {
      if (!form?.get(name)) {
         if (defaultValue) {
            form?.set(name, defaultValue)
         } else {
            form?.set(name, null)
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <Box
         sx={{
            '& .sun-editor': {
               border: 0,
            }
         }}
      >
         <Suspense fallback={<div>Loading...</div>}>
            <SunEditor
               onChange={(content) => {
                  if (onChange) {
                     onChange(content)
                  } else if (form) {
                     form.set(name, content)
                  }
               }}
               setContents={value || form?.get(name) || ""}
               setOptions={configs as any}
               height="400px"
               setDefaultStyle="font-family: Roboto; font-size: 16px;"
               {...props}
            />
         </Suspense>
      </Box>
   );
};
export default Editor;