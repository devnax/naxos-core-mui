import { ReactElement, SVGProps } from "react";
import { DropdownArrayType } from "../Dropdown/types";
import { LayerOptionProps } from '../Layer/types'

export interface WidgetOption {
   id: string;
   title: string;
   icon?: ReactElement<SVGProps<SVGElement>>;
   render: ReactElement;
   optionMenu?: DropdownArrayType[];
}

export interface WidgetStoreOption extends WidgetOption {
   _id?: string;
   observe?: number;
}

export interface WidgetStoreMeta {
   searchText: string
}

export interface PublicHandler {
   create: (opt: WidgetOption) => void;
   remove: (id: string) => void;
   getWidgets: () => WidgetStoreOption[];
   open: (opt?: LayerOptionProps) => void;
   close: () => void;
}