export interface CategoryTableInterface {
    id?: string,
    parent_id?: string,
    name?: string,
}

interface category {
    id: string,
    data: CategoryTableInterface[]
}

export interface OptionsInterface {
    category: category[]
}