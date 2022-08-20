```jsx
type DockProps = BoxProps & {
    fullHeight?: boolean;
    appsType?: string;
    appsBottomType?: string;
    active?: appId;
    placement?: 'left' | 'right' | 'top' | 'bottom';
    size?: "medium" | "large"
    blur?: number;
    bgimage?: string;
    bgcolor?: string;
    tooltip?: boolean; // hover toast
    menuIcon?: ReactElement<SVGProps<SVGElement>> | string | null; // string=img url
    menuProps?: DockMenuProps;
    menuItems?: DropdownArrayType[];
    notification?: Boolean;
    iconProps?: StackProps,

    onAppClick?: (appId: appId) => void;
    onMenuShow?: () => void;
    onAppContextMenu?: (appId: appId) => false | DropdownArrayType[];
};

<DockView {...DockProps} />;
```
