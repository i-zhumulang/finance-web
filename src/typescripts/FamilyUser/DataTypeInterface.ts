import type OptsInterface from "@/typescripts/Common/Common/Interfaces/OptsInterface";

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
}

export interface InviteDataInterface {
    mobile: string,
}

export interface CreateDataInterface {
    name: string,
}

export interface UpdateDataInterface extends CreateDataInterface {

}