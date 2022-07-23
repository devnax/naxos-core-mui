import { StackProps } from "@mui/material";
import { ReactElement } from "react";


export interface State {
   title?: string;
   slug?: string;
   content?: string;
   excerpt?: string;
   thumbnail?: string;
   categories?: number[];
   tags?: Tag[];
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

export interface CategoriesProps {
   id: number;
   title: string;
}

export interface Tag {
   id: number;
   title: string;
}

export interface PublisherProps {
   title?: string;
   categories?: CategoriesProps[];
   tags?: Tag[];
   state?: State;
   metaBoxes?: MetaBox[];
   tabs?: Tabs[];
   activeTab?: string;

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

   slugEdited?: boolean;

   containerProps?: StackProps
}