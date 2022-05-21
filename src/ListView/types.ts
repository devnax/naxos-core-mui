import { ListItemButtonProps } from "@mui/material/ListItemButton";
import { ReactElement, SVGProps } from "react";

export interface ItemProps extends ListItemButtonProps {
   title: string;
   subtitle?: string;
   section?: string;
   icon?: ReactElement<SVGProps<SVGElement>>;
   render: ReactElement;
}