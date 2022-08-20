## Usages

```tsx
import Card from 'naxos-core';

export type CardProps = StackProps & {
    image?: string | ReactElement;
    imageEffect?: 'zoom' | 'rotate' | false;
    imagePadded?: true;
    imageSize?: string | number;

    title?: string | ReactElement;
    content?: string | ReactElement;

    contentMaxLength?: number;
    contentHideOnMobile?: boolean;

    imageProps?: CardMediaProps;
    titleProps?: Partial<TypographyProps>;
    contentProps?: Partial<TypographyProps>;

    inline?: boolean;
    footer?: ReactElement;
    hoverShadow?: boolean;
    bordered?: boolean;
};

<Card {...CardProps} />;
```
