import { ComponentType, ReactElement } from "react";
import { StackProps } from "@mui/material/Stack";
import { FormTypes } from "../Form/useForm";


export type DataItem = {
   title: string;
   id: string | number;
   [key: string]: any
}

export type ListBuilder = {
   name: string;
   form: FormTypes<any>;
   template: ComponentType;
   defaultValue?: DataItem[];
   onAddItem?: () => Promise<void | DataItem>;
}

export type ListItemProps = StackProps & {
   title: string | ReactElement;
   collapse?: boolean;
   sortable?: boolean;
   render: ReactElement;

   onClose?: () => void;
   onTitleEdit?: (text: string) => void;
   onCollaps?: () => void;
}