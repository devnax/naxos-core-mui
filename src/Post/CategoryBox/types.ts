
type ID = number

export interface CategoryType {
   id: ID;
   name: string;
   subcat?: false;
}


export interface Props {
   categories: CategoryType[];
   defaultValue?: ID[];
   title: string;
   perpage?: number;
   hideSearch?: false;
   hideCreate?: false;
   separate?: false;
   onChange?: (value: ID[]) => void;
}