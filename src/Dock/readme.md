```jsx
interface DockProps {
    fullHeight?: boolean;
    apps?: appId[];
    appsBottom?: appId[];
    active?: appId;
    placement?: 'left' | 'right' | 'top' | 'bottom';
    blur?: number;
    bgimage?: string;
    bgcolor?: string;
    tooltip?: boolean; // hover toast
    menuIcon?: ReactElement<SVGProps<SVGElement>> | string | null; // string=img url
    menuProps?: {
        width?: number,
        blur?: number,
        bgimage?: string,
        bgcolor?: string
    };
    menuItems?: DropdownArrayType[];
    notificationButton?: Boolean;

    onAppClick?: (appId: appId) => void;
    onMenuShow?: () => void;
    onAppContextMenu?: (appId: appId) => false | DropdownArrayType[];
}

<DockView {...DockProps} />;
```
