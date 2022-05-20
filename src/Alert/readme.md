### Api Useg

```js
import Alert from 'nxos/Alert';
```

### Required

> call it on you application root

```jsx
import { LayerView } from 'nxos/Layer';
<LayerView />;
```

## Methods

```tsx
Alert.open(id: string | number, {
   type?: "success" | "error" | "warning" | "info" | "primary";
   title: string;
   content?: string;
   centerContent?: boolean;
   icon?: ReactElement | true;
   buttonText?: [string, string];
   onClick?: (value: boolean) => void;
})
Alert.close()
```

## TS

```js
import { AlertProps } from 'Alert';
```
