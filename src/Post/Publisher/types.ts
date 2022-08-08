import { StackProps } from "@mui/material";
import { ReactElement } from "react";
import { CategoryType } from '../CategoryBox/types'
import { SelectItemProps } from "../../Form/Select";


export type CompProps = {
   form: any;
   props: PublisherProps
}

export interface State {
   title?: string;
   slug?: string;
   content?: string;
   excerpt?: string;
   thumbnail?: string;
   categories?: number[];
   tags?: SelectItemProps[];

   activeTab?: string;

   slugEdited?: boolean;
}

export interface MetaBox {
   title: string;
   sidebar?: boolean;
   content: ReactElement;
}

export interface Tabs {
   title: string;
   content: ReactElement;
}

export interface Tag {
   id: number;
   title: string;
}

export interface PublisherProps {
   title?: string;
   categories?: CategoryType[];
   tags?: SelectItemProps[];
   state?: State;
   metaBoxes?: MetaBox[];
   tabs?: Tabs[];

   editMode?: boolean;
   loading?: boolean;
   editor?: ReactElement;

   hidePublish?: boolean;
   hideThumbnail?: boolean;
   hideExcerpt?: boolean;

   onStateChange?: (state: State) => void;
   onTabChange?: (t: string) => void;
   onPublish?: (state: State) => void;
   onDraft?: (state: State) => void;
   onThumbnailClick?: Function;
   onSlugChange?: (slug: string) => void;

   containerProps?: StackProps;

}