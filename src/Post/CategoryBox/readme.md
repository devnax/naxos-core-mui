
```js

import CategoryBox from 'naxos-core/libs/Post/CategoryBox'


export interface CategoryType {
   id: number;
   name: string;
   parentId?: number;
}

export interface Props {
   categories: CategoryType[];
   defaultValue?: number[];
   title: string;
   perpage?: number;
   hideSearch?: false;
   onChange?: (value: number[]) => void;
   onCreate?: (item: Omit<CategoryType, 'id'>) => Promise<CategoryType>
}


<CategoryBox 
   {...Props}
/>

```