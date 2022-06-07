import { ReactElement, SVGProps } from "react";
import { AlertProps } from "../Alert";
import { DropdownArrayType } from "../Dropdown/types";

export interface AppPermissionType {
   [key: string]: boolean;
}


type RenderType = <P>({ id }: { id: string } & P) => ReactElement

export interface AppProps {
   id: string;
   name: string;
   icon: ReactElement<SVGProps<SVGElement>>;
   render: RenderType; //string url
   contextMenu?: DropdownArrayType[];
   mode?: "hidden" | "normal";
   requiredApps?: string[]; // others App Id
   permissions?: AppPermissionType;
   onOpen?: (id: string) => void;
   onClose?: (id: string) => void;
}

export interface AppPropsStore extends AppProps {
   runned?: boolean;
   closeAlert?: boolean | Pick<AlertProps, "title" | "content">; // Alert contetn
}


export interface AppHandlerPublic {
   create: (options: AppProps) => void;
   run: (id: string) => string;
   remove: (id: string) => void;
   setCloseAlert: (id: string, msg: boolean | Pick<AlertProps, "title" | "content">) => void;
   getRunnedApp: () => AppPropsStore;
   getById: (id: string) => AppPropsStore | null;
   getApps: () => AppPropsStore[];
   searchApp: (query: string) => AppPropsStore[];
   getHiddenApps: () => AppPropsStore[];
   changeMode: (d: string, mode: "normal" | "hidden") => void;
}