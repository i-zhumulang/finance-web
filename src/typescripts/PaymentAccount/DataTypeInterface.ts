import type { PaymentMethodTableInterface } from "@/typescripts/PaymentMethod/DataTypeInterface";
import type OptsInterface from "@/typescripts/Common/Common/Interfaces/OptsInterface";

interface PaymentMethodInterface {
    id: number,
    data: PaymentMethodTableInterface
}

export interface OptionsInterface {
    payment_method: PaymentMethodInterface[],
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
}

export interface CreateDataInterface {
    payment_method_id?: number,
    name: string,
    account: string
}

export interface UpdateDataInterface extends CreateDataInterface {

}
