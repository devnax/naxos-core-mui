## Usages

```ts
import Apps from 'naxos-core'

Apps.create({
   id: string,
   name: string,
   icon: ReactElement<SVGProps<SVGElement>>,
   render: ReactElement,
   contextMenu?: DropdownArrayType[],
   requiredApps?: string[], // others App Id
   permissions?: {key: val, ...},
   onOpen?: (id) => void,
   onClose?: (id) => void,
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
