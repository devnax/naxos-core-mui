
```jsx


interface IconProps {
   id: string;
   name: string;
   icon: ReactElement<SVGProps<SVGElement>>;
}


interface DockProps {
   apps?: AppProps[];
   active?: IconId;
   optionMenu?: DropdownArrayType[];
   autoHide?: boolean;
   placement?: "left" | "right" | "top" | "bottom";
   blur?: number;
   bgimage?: string;
   bgcolor?: string;
   tooltip?: boolean; // hover toast
   menuIcon?: ReactElement<SVGProps<SVGElement>> | string | null; // string=img url
   menuProps?: DockMenuProps;
   menuItems?: DropdownArrayType[];
   notificationButton?: Boolean;

   onAppClick?: (IconId: IconId) => void;
   onMenuShow?: () => void;
}

<DockView
   {...DockProps}
/>

```