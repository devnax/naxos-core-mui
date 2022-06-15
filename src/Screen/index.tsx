import * as React from 'react'
import { withStore } from 'state-range'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { ScreenProps } from './types'
import Scrollbar from '../components/Scrollbar'
import AppHandler from '../Apps'

const ScreenView: React.FC<ScreenProps> = ({ appId, header, footer, ...props }) => {
  const App = AppHandler.getById(appId)
  if (!App) {
    return <></>
  }

  const Render = App.render

  return (
    <Stack
      width="100%"
      height="100%"
      {...props}
    >
      {header && <Box>{header}</Box>}
      <Scrollbar
        style={{
          width: '100%',
          height: '100%',
          flex: 1
        }}
      >
        <Render id={appId} />
      </Scrollbar>
      {footer && <Box>{footer}</Box>}
    </Stack>
  )
}

export default withStore(ScreenView)