### Api Useg

```js
import Modal from 'nxos/modal';
```

### Required

```jsx
import { LayerView } from 'nxos/Layer';
<LayerView />;
```

## Methods

```js
Modal.open(id: string | number, <div>Hello World</div>, {
   ...LayerOptionProps,
   closeButton: true, // Show the default close button
   props?: BoxProps // Modal Box props
})

Modal.close()
Modal.isOpened(id: string | number)
```

### TS

```js
import { ModalOptionsProps } from 'Modal';
```
