export interface CategoryTableInterface {
    id?: number,
    parent_id?: number,
    name: string,
}

export interface Category {
    id: number,
    data: CategoryTableInterface
}

export interface OptionsInterface {
    category: Category[],
    loading: boolean
}