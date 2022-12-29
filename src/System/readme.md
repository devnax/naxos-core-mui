```js

import {OSView, ThemexView, System, Command} from 'system'


// OS Layout
<OSView
   dockProps={DockProps}
   screenProps={ScreenProps}
   runnedAppID=""
   globalView={<></>}
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

### Command

command is just a global scope. if you add a commad with a key and callback then you can excute that command anywhere with the key.

```js
Command.create(unique_key, calback);
Command.remove(key);
Command.excute(key);
Command.has(key);
```
