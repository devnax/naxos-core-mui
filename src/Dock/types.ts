import { ReactElement, SVGProps } from "react";
import { DropdownArrayType } from "../Dropdown/types";
import { AppProps } from "../Apps/types";

type AppId = string


export interface DockMenuProps {
   width?: number;
   blur?: number;
   bgimage?: string;
   bgcolor?: string;
}

export interface DockProps {
   apps?: AppId[];
   active?: AppId;
   optionMenu?: DropdownArrayType[];
   autoHide?: boolean;
   location?: "left" | "right" | "top" | "bottom";
   style?: "full" | "middle" | "separate";

   // line=left line, filled=full bg, contained=icon bg, bar=right line
   // activeIconStyle?: "line" | "filled" | "contained" | "bar";
   blur?: number;
   bgimage?: string;
   bgcolor?: string;
   tooltip?: boolean; // hover toast
   menuIcon?: ReactElement<SVGProps<SVGElement>> | string | null; // string=img url
   menuProps?: DockMenuProps;
   menuItems?: DropdownArrayType[];
   notificationButton?: Boolean;

   onAppClick?: (appId: AppId) => void;
   onMenuShow?: () => void;
}



export interface DockIconProps extends AppProps {
   active?: boolean;
   onClick?: (appId: AppId) => void;
}