import React, { useEffect } from 'react';
import { Alert, Layer } from "../src";
import { LayerView } from '../src/Layer'
import Notify, { NotifyView } from '../src/Notify'
import { withThemex } from 'mui-themex';
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from "@mui/material/CssBaseline"


const App = ({ theme }: any) => {
	return <ThemeProvider theme={theme}>
		<CssBaseline />
		<button
			onClick={() => {
				// Alert.open("test", {
				// 	title: "Alert",
				// 	content: "This is the alert box"
				// })
				// Notify.show({
				// 	title: "Hey there!",
				// 	type: "error"
				// })

				Layer.open("Nice", <div>
					<button
						onClick={() => {
							Alert.open("test", {
								title: "Alert",
								content: "This is the alert box"
							})
						}}
					>OPen Stable</button>
				</div>, {
					blur: 20,
					closeButton: true,
					blurImage: 'https://www.teahub.io/photos/full/4-42869_hills-4k.jpg',
					onClickLayer: () => Layer.close('Nice')
				})
			}}
		>Open</button>
		<LayerView />
		<NotifyView />
	</ThemeProvider>
}

export default withThemex(App, 'dark');
