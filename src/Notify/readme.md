

### Required
> Call it on you application root
```jsx
import {NotifyView} from 'nxos/Notity'

<NotifyView />

```


```ts
import Notify, {NotifyRowProps, NotifyProps, NotifyTypes} from 'nxos/Notify'
Notify.show({
   type?: "success" | "error" | "warning" | "info";
   title: string;
   content?: string;
   icon?: ReactElement;
   autoHide?: boolean;
   pauseOnHover?: boolean;
   closeButton?: boolean;
   onHide?: (options: NotifyProps) => void;
   onClick?: (options: NotifyProps) => void;
   small?: boolean
})

Notify.hide(_id)
Notify.hideAll()

```

### TS
```js
import {NotifyProps} from 'Notify'
```