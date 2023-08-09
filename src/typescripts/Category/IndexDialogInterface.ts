import type OptsInterface from "@/typescripts/Common/Common/Interfaces/OptsInterface";
import type {Category} from "@/typescripts/Category/CommonInterface";

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