import type OptsInterface from "@/typescripts/Common/Common/Interfaces/OptsInterface";

export interface IndexDataQueryInterface {
    offset: number,
    limit: number,
}

export interface IndexDataInterface {
    query: IndexDataQueryInterface,
    table: {
        index: [],
        count: number
    },
    options: {
        operate: OptsInterface[],
    },
}