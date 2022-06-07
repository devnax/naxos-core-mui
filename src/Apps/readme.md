## Usages

```ts
import Apps from 'naxos-core'

Apps.create({
   id: string,
   name: string,
   icon: ReactElement<SVGProps<SVGElement>>,
   render: ReactElement,
   contextMenu?: DropdownArrayType[],
   mode?: "hidden" | "normal",
   requiredApps?: string[], // others App Id
   permissions?: {key: val, ...},
   onOpen?: (id) => void,
   onClose?: (id) => void,
})


const appId = App.run(id: string) // Run the app

App.remove(id)
App.setCloseAlert(true) // or
App.setCloseAlert({title: string, content: string})
App.getRunnedApp() // AppPropsStore;

App.getById() // AppPropsStore
App.getApps() // AppPropsStore[]
App.searchApp() // AppPropsStore[]
App.getHiddenApps() // AppPropsStore[]
App.changeMode(mode: "normal" | "hidden") // 
```