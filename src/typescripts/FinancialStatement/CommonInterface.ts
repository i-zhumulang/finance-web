import type { Category } from "@/typescripts/Category/CommonInterface";

export interface FinancialStatementTableInterface {
    id?: number,
    category_id?: number,
    payment_account_id?: number,
    amount: number,
    consumption_date: string,
    description: string,
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
    payment_account: PaymentAccount[]
}