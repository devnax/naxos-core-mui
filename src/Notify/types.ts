import { ReactElement } from "react"

export type NotifyTypes = "success" | "error" | "warning" | "info"
export type NotifyLocation  = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"

export interface NotifyProps{
   type?: NotifyTypes;
   title: string;
   content?: string;
   icon?: ReactElement;
   location?: NotifyLocation;
   closeButton?: boolean;
   small?: boolean;
   autoHide?: boolean;
   pauseOnHover?: boolean;
   onHide?: (options: NotifyRowProps) => void;
   onClick?: (options: NotifyRowProps) => void;
}


export interface NotifyRowProps extends NotifyProps{
   _id: string,
   observe: number
}