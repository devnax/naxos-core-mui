import React from 'react';
import { withThemex } from 'mui-themex';
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from "@mui/material/CssBaseline"

const ApplyTheme = ({ children, theme }: any) => {
   return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
         {children}
      </ThemeProvider>
   )
}

export default withThemex(ApplyTheme, 'dark', { autoSave: true })
