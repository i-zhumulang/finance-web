import type OptsInterface from "@/typescripts/Common/Common/Interfaces/OptsInterface";

export interface FamilyTableInterface {
    id?: number,
    name: string,
}

export interface OptionsInterface {
    loading: boolean
}

export interface IndexDataInterface {
    query: {
        offset: number,
        limit: number,
    },
    table: {
        index: [],
        count: number
    },
    options: {
        operate: OptsInterface[],
    },
    loading: boolean
}

export interface IndexDialogInterface {
    dialogCreateVisible: boolean,
    dialogUpdateVisible: boolean,
    dialogLogsVisible: boolean,
}