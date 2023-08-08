export interface CategoryTableInterface {
    id?: number,
    parent_id?: number,
    name: string,
}

interface category {
    id: number,
    data: CategoryTableInterface
}

export interface OptionsInterface {
    category: category[]
}