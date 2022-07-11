

```js

import {OSView, ThemexView, System} from 'system'


// OS Layout
<OSView 
   dockProps={DockProps}
   screenProps={ScreenProps}
   runnedAppID=""
/>

// system theme setup with mui-themex
<ThemexView></ThemexView>


interface Props{
   dockSetting: {
      bgcolor: string,
      blur: number
   };
}

class Sys extends System<Props>{
   defaults = {
      dockSetting: {
         bgcolor: "",
         blur: 20
      }
   }
}
const global = new Sys

global.get("dockSetting")
global.set("dockSetting", {
   bgcolor: "red"
})


global.observe("dockSetting")
global.getAll() // return all system props
```