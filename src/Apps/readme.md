## Usages

```ts
import Apps from 'naxos-core'

Apps.create({
   id: string;
   type?: 'os' | string;
   name: string;
   icon: ReactElement<SVGProps<SVGElement>>;
   render: RenderType; //string url
   contextMenu?: DropdownArrayType[];
   requiredApps?: string[]; // others App Id
   permissions?: AppPermissionType;
   onOpen?: (id: string) => void;
   onClose?: (id: string) => void;
   childApps?: AppProps[]; // Main app has multiple child app. it jus groupping

   shorcutKeys?: ShorcutKeys[]; // this shortcut key will work when the app is running

   commands?: CommandType[];
})


const appId = App.run(id: string) // Run the app

App.remove(id)
App.setCloseAlert(true) // or string
App.setCloseAlert({title: string, content: string})
App.getRunnedApp() // AppPropsStore;

App.getById(id: string) // AppPropsStore
App.getApps() // AppPropsStore[]
App.searchApp(query: string) // AppPropsStore[]
```
