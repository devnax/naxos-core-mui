```jsx

import List, {ListView} from 'naxos-core'

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


///

interface ListViewProps extends ListProps {
   listId: ID;
   active?: ID;
   button?: boolean;
   onItemClick?: (itemId: ID) => void;
}

<ListView
   {...ListViewProps}
/>

```
