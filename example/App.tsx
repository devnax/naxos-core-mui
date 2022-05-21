import React, { useEffect } from 'react';
import { Alert, Layer, Notification } from "../src";
import { LayerView } from '../src/Layer'
import Notify, { NotifyView } from '../src/Notify'
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box'
import ListView from '../src/ListView'

const App = () => {
	const theme = useTheme();

	return <div>

		<Box p={2}>
			<ListView />
		</Box>

		<button
			onClick={() => {

				Notification.open()



				// Alert.open("test", {
				// 	title: "Alert",
				// 	content: "This is the alert box"
				// })
				// Notify.show({
				// 	title: "Hey there!",
				// 	type: "error"
				// })

				return;

				Layer.open("Nice", <Box
					width={900}
					m="20px auto"
					borderRadius={3}
					p={3}
					bgcolor="primary.main"
				>
					<button
						onClick={() => {
							Alert.open("test", {
								title: "Alert",
								content: "This is the alert box"
							})
						}}
					>OPen Stable</button>
				</Box>, {
					blur: 20,
					closeButton: true,
					bgImage: 'https://www.teahub.io/photos/full/4-42869_hills-4k.jpg',
					// gradient: [alpha(theme.palette.primary.main, .3), alpha(theme.palette.primary.dark, .8)],
					opacity: .3
				})
			}}
		>Open the main modal box</button>

		<LayerView />
		<NotifyView />
	</div>
}

export default App
