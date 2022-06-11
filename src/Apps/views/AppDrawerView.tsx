import React from 'react'
import Grid from '@mui/material/Grid'
import Scrollbar from 'react-browser-scrollbar'
import { isDarkMode } from 'mui-themex'
import { withStore } from 'state-range'

import AppHandler from '../AppHandler'

const AppDrawerView = () => {

  const Apps = AppHandler.getApps()

  return (
    <Scrollbar
      darkMode={isDarkMode()}
      thumbSize={1}
    >
      <Grid container p={2} >
        {
          Apps.map((app) => {
            return <Grid key={app.id} item p={1} xs={6} sm={4} md={2.4} lg={1.71} xl={1.5}>

            </Grid>
          })
        }
      </Grid>
    </Scrollbar>
  )
}

export default withStore(AppDrawerView)