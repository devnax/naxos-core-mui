### Api Useg

```js
import Notification from 'nxos/notification';
```

### Required

> call it on you application root

```jsx
import { LayerView } from 'nxos/Layer';
<LayerView />;
```

## Methods

```tsx

// create a notification
Notification.create({
   id: string | number,
   title: string,
   icon?: ReactElement,
   content?: string,
   onClick?: Function,
   buttonText?: [string, string | null],
   onButtonClick?: Function,
   created?: number,
   notify?: boolean,
})


// Set the notification settings
Notification.settings(options?: {
   onLoad?: Function; // call this function when the notificaiton panel load
   onLoadMore?: Function; // call this when the notificaiton scroll is down
   optionMenu?: DropdownArrayType[]; // set options menu
   itemOptionMenu?: DropdownArrayType[]; // set item option menue
})

// Remove a notification for this id
Notification.remove(id: string | number)

// remove All notifications
Notification.removeAll()

// Open the notification panel
Notification.open()

// Close the notification panel
Notification.close()

// Read mode
Notification.read(id: string | number)

// Unread Mode
Notification.unread(id: string | number)

// Read Mode for all
Notification.readAll()

// Set the loading
Notification.loading(is: boolean)

// check the loading is true or false
Notification.isLoading()

```

### TS

```js
import { NotificationProps, NotificationSettingProps, NotificationPropsRow } from 'nxos/notification';
```
