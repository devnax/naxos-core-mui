import React, { ReactElement } from 'react'
import Stack from '@mui/material/Stack'
import Button, { ButtonProps } from '@mui/material/Button'
import { Box } from '@mui/material';

type Props = ButtonProps & {
   align?: "center" | "left";
   leftContent?: ReactElement;
   update?: boolean;
}
const Submit = ({ children, align, leftContent, update, ...props }: Props) => {
   let alignment = "flex-end"
   if (align === 'center') {
      alignment = 'center'
   } else if (align === 'left') {
      alignment = 'flex-end'
   }

   return (
      <Stack
         direction='row'
         justifyContent={alignment}
      >
         {leftContent && <Box flex={1}>{leftContent}</Box>}
         <Button
            variant="contained"
            size="large"
            {...props}
         >{children || (update === true ? "Update" : "Save")}</Button>
      </Stack>
   )
}

export default Submit