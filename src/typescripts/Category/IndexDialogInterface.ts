import type OptsInterface from "@/typescripts/Common/Common/Interfaces/OptsInterface";

export interface IndexDataInterface {
    query: {
        offset: number,
        limit: number,
        parent_id?: number,
    },
    table: {
        index: [],
        count: number
    },
    options: {
        operate: OptsInterface[]
    }
}

export interface IndexDialogInterface {
    dialogCreateVisible: boolean,
    dialogUpdateVisible: boolean,
    dialogLogsVisible: boolean,
}