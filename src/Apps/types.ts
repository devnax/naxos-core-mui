import { ReactElement, SVGProps } from "react";
import { AlertProps } from "../Alert";
import { DropdownArrayType } from "../Dropdown/types";

export interface AppPermissionType {
   [key: string]: boolean;
}

type RenderType = ({ id }: { id: string }) => ReactElement

export interface AppProps {
   id: string;
   type?: "os" | string;
   name: string;
   icon: ReactElement<SVGProps<SVGElement>>;
   render: RenderType; //string url
   contextMenu?: DropdownArrayType[];
   requiredApps?: string[]; // others App Id
   permissions?: AppPermissionType;
   onOpen?: (id: string) => void;
   onClose?: (id: string) => void;

   childApps?: AppProps[]; // Main app has multiple child app. it jus groupping
}

export interface AppPropsStore extends AppProps {
   closeAlert?: boolean | Pick<AlertProps, "title" | "content">; // Alert contetn
}


export interface AppHandlerPublic {
   create: (options: AppProps) => void;
   // run: (id: string) => string;
   remove: (id: string) => void;
   // setCloseAlert: (id: string, msg: boolean | Pick<AlertProps, "title" | "content">) => void;
   // getRunnedApp: () => AppPropsStore;
   getById: (id: string) => AppPropsStore | null;
   getApps: () => AppPropsStore[];
   searchApp: (query: string) => AppPropsStore[];
}