import React, { useEffect } from 'react';
import { Alert } from "../src";
import { LayerView } from '../src/Layer'
import Notify, { NotifyView } from '../src/Notify'
const App = () => {
	return <div>
		<button
			onClick={() => {
				Alert.open("test", {
					title: "Alert",
					content: "This is the alert box"
				})
				Notify.show({
					title: "Hey there!",
					type: "error"
				})
			}}
		>Open</button>
		<LayerView />
		<NotifyView />
	</div>
}

export default App;
