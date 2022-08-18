
```js

export interface TagsProps {
   name: string;
   label?: string;
   form: FormTypes<any>;
   options: SelectItemProps[];
   defaultValue?: (SelectItemProps['value'])[],
}

<Tags 
   {...TagsProps}
/>


```