

```js
import Scrollbar from 'naxos-core/Scrollbar'

interface Props extends DivProps {
   children: ReactElement | ReactNode;
   autoHide?: boolean;
   thumbSize?: number;
   onScrollEnd?: (e: UIEvent<HTMLDivElement>) => void;
   onScrollStop?: (e: UIEvent<HTMLDivElement>) => void;
   onScrollStart?: (e: UIEvent<HTMLDivElement>) => void;
}

<Scrollbar {...props}>
...
</Scrollbar>

```