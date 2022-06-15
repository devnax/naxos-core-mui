import { ReactElement, SVGProps } from "react";
import { DropdownArrayType } from "../Dropdown/types";
import { AppProps } from "../Apps/types";
import { ButtonProps } from "@mui/material/Button";
import { StackProps } from "@mui/material/Stack";

export interface DockMenuProps {
   width?: number;
   blur?: number;
   bgimage?: string;
   bgcolor?: string;
}

type appId = AppProps['id']


export interface DockProps {
   apps?: appId[];
   active?: appId;
   placement?: "left" | "right" | "top" | "bottom";
   blur?: number;
   bgimage?: string;
   bgcolor?: string;
   tooltip?: boolean; // hover toast
   menuIcon?: ReactElement<SVGProps<SVGElement>> | string | null; // string=img url
   menuProps?: DockMenuProps;
   menuItems?: DropdownArrayType[];
   notificationButton?: Boolean;

   onAppClick?: (appId: appId) => void;
   onMenuShow?: () => void;
   onAppContextMenu?: (appId: appId) => false | DropdownArrayType[]
}



export interface DockIconProps extends AppProps {
   active?: boolean;
   placement?: DockProps['placement'];
   buttonProps?: ButtonProps;
   boxProps?: StackProps;
}