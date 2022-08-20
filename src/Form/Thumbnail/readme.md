```js
export interface ThumbnailProps {
    name: string;
    form: FormTypes<any>;
    defaultValue?: string;
    onClick?: Function;
    video?: boolean;
    url?: boolean;
    schema?: (s: any) => typeof SchemaFactory;
    value?: string;
    defaultType?: 'image' | 'video';
    type?: 'image' | 'video';
    hideUrl?: boolean;

    width?: number | string;
    height?: number | string;
}

<Thumbnail {...ThumbnailProps} />;
```
