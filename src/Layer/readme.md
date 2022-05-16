### Api Useg

```js
import Layer, {LayerView} from 'layer'


// call the LayerView Globally
<LayerView />


// then call the methods fro Layer
Layer.open(id: string | number, content: ReactElement, options)
Layer.close(id?) // if you give the id then layer will remove with this id or remove the current
Layer.closeAll()
Layer.isOpened(id: string | number)
```

### Open Methods Props Type

> Content will be ReactElement or ReactChild
> Options will be an object
```js
{
   stable: false, // if this true, then next layears will be always show
   closeButton: true, // Show the default close button
   animation: 'zoomOver', // fmotion-variants type
   opacity: 1, // bacground opacity
   props: {}, // root element properties
   onOpen: () => {}, // cal when open the layer
   onClose: () => {}, // whene close the layer
   onClickLayer?: (e: MouseEvent<HTMLDivElement>) => void;
   blur?: number;
   blurImage?: string;
   blurGradient?: [string, string]
}

```


## TS
```js
import { LayerOptionProps } from 'naxos/Layer'
```