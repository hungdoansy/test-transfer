export interface Account {
    account_id: number
    balance: string
}

export interface Transaction {
    source_account_id: number
    destination_account_id: number
    amount: string
}

export type ServiceResponse<T> =
    | {
          success: true
          data: T
      }
    | {
          success: false
          error: string
      }
