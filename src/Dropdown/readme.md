### Required

> Call it on your application root

```jsx
import { DropdownView } from 'nxos/Dropdown';
<DropdownView />;
```

### Use

```jsx
import Dropdown from 'nxos/Dropdown';

type options = MuiPopperProps & {
  boxProps: BoxProps
}

Dropdown.show(HTMLElement, ReactElement | ArrayItems, options);
Dropdown.showContextMenu(event, content: ReactElement | DropdownArrayType[], props?: PopperProps);
Dropdown.hide();
Dropdown.isShow(); // return boolean
```

### ArrayItems

```js
{
  title: string | ReactElement
  icon?: ReactElement
  label?: string | ReactElement
  divider?: boolean
  onClick?: Function;
  onClose?: Function;
  ...ListItemButtonProps
}

```

### TS Types

```js
import { DropdownArrayType, DropdownProps, DropdownRowProps } from 'nxos/Dropdown';
```
