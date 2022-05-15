### Api Useg

```js
import Finder from 'nxos/Finder'

```


### Required
> call it on you application root

```jsx
import {LayerView} from 'nxos/Layer'
<LayerView />

```


## Methods
```tsx

import Finder, {FinderView} from 'nxos/Finder'

// default setting
Finder.settings({
   onLoad?: () => void; // call it whene open the finder
   onClose?: () => void; // call it whene close the finder
   filterable?: boolean; // show or hide the filter button
   placeholder?: string; // input placeholder
   findOnly?: string; // find only specific module
})

// open with custom setting
Finder.open({
   onLoad?: () => void; // call it whene open the finder
   onClose?: () => void; // call it whene close the finder
   filterable?: boolean; // show or hide the filter button
   placeholder?: string; // input placeholder
   findOnly?: string; // find only specific module
})

// close the finder
Finder.close()


// FinderView is the optional view. If you to show the finder alwasy in anywhere then you can call this component
<FinderView />


Finder.subcribe({
   id: 'users';
   callback: async (searchText, page) => {

      return [
         {
            title: string,  // required
            icon: string | ReactElement, // image url
            description?: string,
            ...others
         }
      ]
   },
   onItemClick?: (item) => void; // call this whene click an item
})

Finder.unsubcribe('users')
 
```


### TS Types

```js

import {SubcribeCallbackType, SubcriberProps, FinderSettingProps, FoundedData} from 'nxos/Finder'

```