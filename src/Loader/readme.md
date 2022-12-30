## Useges

```js
import Loader from 'naxos/Loader';

export type LoaderProps = StackProps & {
    loading?: boolean;
    children: ReactElement | ReactNode;
    progressProps?: CircularProgressProps
};

<Loader loading={true} {...LoaderProps}>
    ...
</Loader>;
```
