type ID = number;

export interface CategoryType {
    id: ID;
    name: string;
    parentId?: ID;
}

export interface Props {
    categories: CategoryType[];
    defaultValue?: ID[];
    title: string;
    perpage?: number;
    hideSearch?: false;
    onChange?: (value: ID[]) => void;
    onCreate?: (item: Omit<CategoryType, 'id'>) => Promise<CategoryType>;
}
