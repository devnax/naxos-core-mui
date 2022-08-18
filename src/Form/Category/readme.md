
```js

type ID = number | string

export interface CategoryType {
   label: string;
   value: ID;
   parentId?: ID;
}

export interface CategoryProps {
   name: string;
   form: FormTypes<any>;
   items: CategoryType[];
   defaultValue?: ID[];
   perpage?: number;
   hideSearch?: false;
   onChange?: (value: ID[]) => void;
   onCreate?: (props: { text: string, parent: ID }) => void
}

<Category 
   {...Props}
/>


```