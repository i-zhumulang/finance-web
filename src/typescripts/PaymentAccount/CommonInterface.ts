import type { PaymentMethodTableInterface } from "@/typescripts/PaymentMethod/CommonInterface";

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