
```jsx

import List from 'naxos-core'

export interface ListItemProps {
   id: ID;
   parentId?: ID | false;
   title: string;
   label?: string;
   icon?: ReactElement<SVGProps<SVGElement>>;
   render?: RenderType; //string url
}


List.addItems(listId, ListItemProps[])
List.getItems(listId)
List.getChilds(listId, parentId)
List.deleteList(listId)

```