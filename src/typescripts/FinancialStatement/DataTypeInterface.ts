import type OptsInterface from "@/typescripts/Common/Common/Interfaces/OptsInterface";

export interface FinancialStatementTableInterface {
    id?: number,
    category_id?: number,
    payment_account_id?: number,
    amount: number,
    consumption_date: string,
    description: string,
    files_id?: number[]
}

export interface Category {
    id: number,
    data: {
        name: string
    },
    children: { id: number, data: { name: string } }[]
}

export interface PaymentAccount {
    id: number,
    data: {
        name: string,
    }
}

export interface PaymentMethod {
    id: number,
    data: {
        name: string,
    },
    payment_account: PaymentAccount[]
}

export interface OptionsInterface {
    category: Category[],
    payment_method: PaymentMethod[],
    payment_account: PaymentAccount[],
    loading: boolean
}

export interface Files {
    id: number,
    name: string,
    url: string
}

export interface IndexDataInterface {
    query: {
        offset: number,
        limit: number,
        category_id?: number,
        payment_method_id?: number,
        payment_account_id?: number,
    },
    table: {
        index: [],
        count: number
    },
    options: {
        operate: OptsInterface[],
        category: Category[],
        payment_method: PaymentMethod[],
        payment_account: PaymentAccount[]
    },
    loading: boolean
}

export interface IndexDialogInterface {
    dialogCreateVisible: boolean,
    dialogUpdateVisible: boolean,
    dialogLogsVisible: boolean,
}