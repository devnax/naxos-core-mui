import { ReactElement, SVGProps } from "react";
import { DropdownArrayType } from "../Dropdown/types";

export interface DockMenuProps {
   width?: number;
   blur?: number;
   bgimage?: string;
   bgcolor?: string;
}

type IconId = string


export interface IconProps {
   id: string;
   name: string;
   icon: ReactElement<SVGProps<SVGElement>>;
}


export interface DockProps {
   icons?: IconProps[];
   active?: IconId;
   contextMenu?: DropdownArrayType[];
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

   onAppClick?: (iconId: IconId) => void;
   onMenuShow?: () => void;
}



export interface DockIconProps extends IconProps {
   active?: boolean;
   onClick?: (iconId: IconId) => void;
   placement?: DockProps['placement']
}