import React, { useEffect } from 'react';
import { Alert, Layer, Notification } from "../src";
import { LayerView } from '../src/Layer'
import Notify, { NotifyView } from '../src/Notify'
import { alpha, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import ListViewHandler, { ListViewTemplate } from '../src/ListView'
import IconButton from '@mui/material/IconButton'
import HomeIcon from '@mui/icons-material/Home';



const App = () => {
	const theme = useTheme();

	useEffect(() => {
		const items = [
			{
				sectionTitle: "PROPERTY",
				title: "General",
				subtitle: "Pert Of settings",
				render: <Box bgcolor="primary.main" p={2} borderRadius={2}>Nice</Box>
			},
			{
				title: "Appearance",
				render: <Box bgcolor="warning.main" p={2} borderRadius={2}>Nice</Box>
			},
			{
				title: "Settings",
				render: <Box bgcolor="info.main" p={2} borderRadius={2}>Nice</Box>
			},
			{
				sectionTitle: "INFORMATION",
				title: "Billing",
				render: <Box bgcolor="error.main" p={2} borderRadius={2}>Nice</Box>
			}
		]
		ListViewHandler.setList('profile-list', [...items])
		// ListViewHandler.setList('profile-list1', [...items])
	}, [])

	return <>


		<Stack
			direction="row"
			position="fixed"
			top={0}
			left={0}
			right={0}
			bottom={0}
			height="100vh"
		>
			<Box width={60} bgcolor="background.paper">
				<IconButton >
					<HomeIcon />
				</IconButton>
			</Box>
			<Box flex={1}>
				<button
					onClick={() => {

						// Notification.open()



						// // Alert.open("test", {
						// // 	title: "Alert",
						// // 	content: "This is the alert box"
						// // })
						// // Notify.show({
						// // 	title: "Hey there!",
						// // 	type: "error"
						// // })

						// return;

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
							// closeButton: true,
							bgImage: 'https://www.teahub.io/photos/full/4-42869_hills-4k.jpg',
							gradient: [alpha(theme.palette.primary.main, .3), alpha(theme.palette.primary.dark, .8)],
							opacity: .3,
							onClickLayer: () => Layer.close()
						})
					}}
				>Open the main modal box</button>
			</Box>
		</Stack>
		<LayerView />
		{/* <LayerView />
		<NotifyView /> */}
	</>
}

export default App
