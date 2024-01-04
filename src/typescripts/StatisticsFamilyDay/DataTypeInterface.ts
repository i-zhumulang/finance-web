interface FamilyInterface {
    id: number,
    data: {
        name: string
    }
}

export interface IndexDataInterface {
    query: {
        offset: number,
        limit: number,
        family_id: number,
    },
    table: {
        index: [],
        count: number
    },
    options: {
        family: FamilyInterface[],
    }
}

export interface FinancialStatementInterface {
    table: {
        index: []
    }
}