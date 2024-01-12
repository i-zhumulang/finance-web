import type OptsInterface from "@/typescripts/Common/Common/Interfaces/OptsInterface";

interface FamilyInterface {
    id: string,
    data: {
        name: string
    }
}

interface TypeInterface {
    en: string,
    zh: string,
}

export interface IndexDataInterface {
    query: {
        offset: number,
        limit: number,
        family_id: string,
        type: string,
    },
    table: {
        index: [],
        count: number
    },
    options: {
        operate: OptsInterface[],
        family: FamilyInterface[],
        type: TypeInterface[],
    },
}