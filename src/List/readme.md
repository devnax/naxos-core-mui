```jsx

import List, {ListView, ListPreview} from 'naxos-core'


class Handler extends List {
   constructor() {
      super();
      this.addItems([
         {
            id: "deshboard",
            title: "Deshboard",
            icon: <ArchiveRoundedIcon />,
            render: () => <Box p={2} bgcolor="red">deshboard</Box>,
            divider: true
         },
      ])

      this.activeItem('add_post')
   }
}

const handler = new Handler

<ListView
   handler={handler}
   button={boolean}
   onItemClick={(item: StoreProps) => void}
   autoChange={boolean}
/>


<ListPreview
   handler={handler}
/>

export interface ListItemProps {
   id: ID;
    parentId?: ID | false;
    title: string;
    label?: string;
    heading?: string | ReactElement;
    icon?: ReactElement<SVGProps<SVGElement>>;
    render?: ComponentType<{ id: string }>;
    divider?: boolean;
    active?: boolean;
}


```


### Methods

```js

handler.onItemClick?(item: StoreProps): void;
handler.addItem(item: ListItemProps)
handler.addItems(items: ListItemProps[])
handler.getParents(): ListItemProps[]
handler.getPrentOfChild(childId: ID): ListItemProps  | null
handler.getChilds(parentId: ID): ListItemProps[]
handler.getItem(id: ID): ListItemProps | null
handler.getActiveItem(): ListItemProps | null
handler.activeItem(id: ID)

```
