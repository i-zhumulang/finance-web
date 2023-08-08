export interface FinancialStatementTableInterface {
    id?: number,
    category_id?: number,
    payment_account_id?: number,
    amount: number,
    consumption_date: string,
    description: string,
}