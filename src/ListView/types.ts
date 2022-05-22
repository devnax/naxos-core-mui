import { ListItemButtonProps } from "@mui/material/ListItemButton";
import { ReactElement, SVGProps } from "react";

export interface ItemProps extends ListItemButtonProps {
   viewId?: string;
   title: string;
   render: ReactElement;
   subtitle?: string;
   sectionTitle?: string;
   icon?: ReactElement<SVGProps<SVGElement>>;
   active?: boolean;
}
