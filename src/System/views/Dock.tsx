import React from 'react'
import { DockView } from '../../Dock'
import { DockProps } from '../../Dock/types'
import AppHandler from '../../Apps'
import { withStore } from 'state-range'

const Dock = (props: DockProps) => {
   const apps = AppHandler.getApps()
   return <DockView
      apps={apps.map((app) => app.id)}
      tooltip
      notificationButton={false}
      {...props}
   />
}

export default withStore(Dock, (props: DockProps) => {
   return [Object.values(props)]
})