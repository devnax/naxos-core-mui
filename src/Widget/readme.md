```tsx
import Widget from 'naxos-core/Widget';

Widget.create({
   id: string;
   title: string;
   icon?: ReactElement<SVGProps<SVGElement>>;
   render: ReactElement;
   optionMenu?: DropdownArrayType[];
})

Widget.remove(id: string)
Widget.getWidgets()
Widget.open(opt?: LayerOptionProps)
Widget.close()


```
