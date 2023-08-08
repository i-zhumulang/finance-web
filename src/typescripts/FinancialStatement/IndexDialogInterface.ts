import type OptsInterface from "@/typescripts/Common/Common/Interfaces/OptsInterface";
import type {Category} from "@/typescripts/Category/CommonInterface";
import type { PaymentAccount, PaymentMethod } from "@/typescripts/FinancialStatement/CommonInterface";

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
    }
}

export interface IndexDialogInterface {
    dialogCreateVisible: boolean,
    dialogUpdateVisible: boolean,
    dialogLogsVisible: boolean,
}