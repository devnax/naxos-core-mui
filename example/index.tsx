import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App'
import { withThemex } from 'mui-themex';
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from "@mui/material/CssBaseline"

const Root = ({ theme }: any) => {
   return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
         <App />
      </ThemeProvider>
   )
}

const RootApp = withThemex(Root, 'dark')


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<RootApp />);