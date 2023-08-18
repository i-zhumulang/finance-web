import type { PaymentMethodTableInterface } from "@/typescripts/PaymentMethod/DataTypeInterface";
import type OptsInterface from "@/typescripts/Common/Common/Interfaces/OptsInterface";

export interface PaymentAccountTableInterface {
    id?: number,
    payment_method_id?: number,
    name: string,
    account: string
}

interface PaymentMethod {
    id: number,
    data: PaymentMethodTableInterface
}

export interface OptionsInterface {
    payment_method: PaymentMethod[],
    loading: boolean
}

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
        operate: OptsInterface[]
    },
    loading: boolean
}

export interface IndexDialogInterface {
    dialogCreateVisible: boolean,
    dialogUpdateVisible: boolean,
    dialogLogsVisible: boolean,
}