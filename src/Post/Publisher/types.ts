import { ReactElement } from "react";


export interface State {
   title: string;
   slug: string;
   content: string;
   excerpt: string;
   thumbnail: string;
   categories: number[];
   tags: number[];
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

export interface PublisherProps {
   categories: object;
   tags: object;
   defaultState: State;
   metaBoxes?: MetaBox[];
   tabs?: Tabs[];

   editMode?: boolean;
   loading?: boolean;
   editor?: ReactElement;

   expandable?: boolean;
   hideCategory?: boolean;
   hideTags?: boolean;
   hideThumbnail?: boolean;
   hideExcerpt?: boolean;
   onStateChange?: Function;
   onPageChange?: Function;
   onPublish?: Function;
   onDraft?: Function;
   onThumbnailClick?: Function;
   onSlugChange?: (slug: string) => void;
}