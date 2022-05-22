```js

import ListViewHandler, {ListViewTemplate, ListItemsView, ContentView} from 'naxos-core'


// Full Template
<ListViewTemplate 
   id={string}
   sidebarTitle={string}
/>

// Separatly
<ListItemsView id={string} />
<ContentView id={string} />


// Handler

ListViewHandler.setList(id, [
   {
      title: string;
      render: ReactElement;
      subtitle?: string;
      sectionTitle?: string;
      icon?: ReactElement<SVGProps<SVGElement>>;
   }
])
 


```