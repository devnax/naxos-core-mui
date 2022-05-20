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
   closeButton: true, // Show the default close button
   animation: 'zoomOver', // fmotion-variants type
   opacity: 1, // bacground opacity
   props: {}, // root element properties
   onOpen: () => {}, // cal when open the layer
   onClose: () => {}, // whene close the layer
   clickToClose: false
})
Modal.close()
Modal.isOpened(id: string | number)
```

### TS

```js
import { ModalOptionsProps } from 'Modal';
```
