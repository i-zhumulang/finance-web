import type OptsInterface from "@/typescripts/Common/Common/Interfaces/OptsInterface";

export interface CategoryInterface {
    id: number,
    data: {
        name: string
    },
    children: { id: number, data: { name: string } }[]
}

export interface PaymentAccountInterface {
    id: number,
    data: {
        name: string,
    }
}

export interface FamilyUserInterface {
    id: number,
    data: {
        id: string,
        name: string,
    }
}

export interface PaymentMethodInterface {
    id: number,
    data: {
        name: string,
    },
    payment_account: PaymentAccountInterface[]
}

export interface OptionsInterface {
    category: CategoryInterface[],
    payment_method: PaymentMethodInterface[],
    payment_account: PaymentAccountInterface[],
    loading: boolean
}

export interface Files {
    id: number,
    name: string,
    url: string
}

export interface IndexDataQueryInterface {
    offset: number,
    limit: number,
    category_id?: string,
    family_user_id?: string,
    payment_method_id?: string,
    payment_account_id?: string,
}

export interface IndexDataInterface {
    query: IndexDataQueryInterface,
    table: {
        index: [],
        count: number
    },
    options: {
        operate: OptsInterface[],
        category: CategoryInterface[],
        family_user: FamilyUserInterface[],
        payment_method: PaymentMethodInterface[],
        payment_account: PaymentAccountInterface[]
    },
}

export interface CreateDataInterface {
    category_id?: number,
    payment_account_id?: number,
    amount: number,
    consumption_date: string,
    description: string,
    files_id: number[]
}

export interface UpdateDataInterface extends CreateDataInterface {

}