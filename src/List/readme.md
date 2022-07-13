```jsx

import List, {ListView, ListPreview} from 'naxos-core'

export interface ListItemProps {
   id: ID;
   parentId?: ID | false;
   title: string;
   label?: string;
   icon?: ReactElement<SVGProps<SVGElement>>;
   render?: ComponentType<{ listId: string, id: string }>;
   divider?: Boolean;
}


List.setItems(listId, ListItemProps[])
List.getItems(listId)
List.getItem(listId, itemId)
List.getChilds(listId, parentId)
List.deleteList(listId)


interface ListViewProps extends ListProps {
   listId: ID;
   active?: ID;
   button?: boolean;
   onItemClick?: (item) => void;
}

<ListView
   {...ListViewProps}
/>

type Props = BoxProps & {
   listId: string;
   activeId: string
}

<ListPreview
   {...Props}
/>

```
