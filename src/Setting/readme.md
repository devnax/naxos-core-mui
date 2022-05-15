### Api Useg

```js
import Setting from 'nxos/Setting'

```


### Required
> call it on you application root

```jsx
import {LayerView} from 'nxos/Layer'
<LayerView />

```


## Methods
```tsx

import Setting from 'nxos/Setting'


Setting.setConfig({
   opacity?: number;
   blur?: number;
   blurImage?: string;
   blurGradient?: [string, string]
})

Setting.getConfig() 


// Add setting
Setting.create({
   id: string, // required unique settings
   title: string, 
   render: ReactElement,
   category: string,
   categoryIcon?: ReactElement, // set the category Icon
   // methods
   onSettingOpen?: Function, // call it when open the setting
   onSettingClose?: Function, // call it when close the setting
   onView?: Function, // call it when view the setting
   onExit?: Function // call it when exit the setting
})

// open the setting view
Setting.open()

// close the setting
Setting.close()


// Read the setting if you need after create
Setting.get(id: string)

// remove existing setting if you want
Setting.remove(id: string)
 
```


### TS Types

```js

import {SettingProps, ConfigProps} from 'nxos/Setting'

```