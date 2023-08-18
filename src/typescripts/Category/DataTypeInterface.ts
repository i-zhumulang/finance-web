import type OptsInterface from "@/typescripts/Common/Common/Interfaces/OptsInterface";

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

export interface IndexDataInterface {
    query: {
        offset: number,
        limit: number,
        id?: number,
    },
    table: {
        index: [],
        count: number
    },
    options: {
        operate: OptsInterface[],
        category: Category[]
    },
    loading: boolean
}

export interface IndexDialogInterface {
    dialogCreateVisible: boolean,
    dialogUpdateVisible: boolean,
    dialogLogsVisible: boolean,
}