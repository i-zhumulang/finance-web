import type OptsInterface from "@/typescripts/Common/Common/Interfaces/OptsInterface";

export interface CategoryTableInterface {
    id?: number,
    parent_id?: number,
    name: string,
}

export interface CategoryInterface {
    id: number,
    data: CategoryTableInterface
}

export interface OptionsInterface {
    category: CategoryInterface[],
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
        category: CategoryInterface[]
    },
}

export interface CreateDataInterface {
    parent_id?: number,
    name: string
}

export interface UpdateDataInterface extends CreateDataInterface {
    parent_id?: number,
    name: string
}