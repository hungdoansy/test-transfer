import { API_BASE_URL } from "@/constants"
import { ERROR_MESSAGES } from "@/constants/error"
import { simulateNetworkDelay } from "@/lib/request"
import type { Account, Transaction, ServiceResponse } from "@/types"

export async function createAccount(accountId: number, initialBalance: string): Promise<ServiceResponse<Account>> {
    return simulateNetworkDelay(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/accounts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ account_id: accountId, initial_balance: initialBalance }),
            })

            if (response.ok) {
                const accountBalance = (await response.json()) as Account
                return {
                    success: true,
                    data: accountBalance,
                }
            }

            const text = await response.text()
            if (text.includes(ERROR_MESSAGES.ACCOUNT_ALREADY_EXISTS)) {
                const accountBalance = await getAccountBalance(accountId)
                if (accountBalance.success) {
                    return {
                        success: true,
                        data: accountBalance.data,
                    }
                }
            }

            throw new Error(text)
        } catch (err) {
            if (err instanceof Error) {
                return { success: false, error: err.message }
            }

            console.error(err)
            return {
                success: false,
                error: "Unable to create new account. Please review the inputs and try again shortly.",
            }
        }
    })
}

export async function getAccountBalance(id: number): Promise<ServiceResponse<Account>> {
    return simulateNetworkDelay(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/accounts/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json()
            return { success: true, data }
        } catch (err) {
            if (err instanceof Error) {
                return { success: false, error: err.message }
            }

            console.error(err)
            return { success: false, error: "Unable to load account balance. Please try again shortly." }
        }
    })
}

export async function createTransaction(transaction: Transaction): Promise<ServiceResponse<Transaction>> {
    return simulateNetworkDelay(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/transactions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(transaction),
            })

            if (response.ok) {
                return {
                    success: true,
                    data: transaction,
                }
            }

            const text = await response.text()
            if (text.includes(ERROR_MESSAGES.SOURCE_ACCOUNT_NOT_FOUND)) {
                return { success: false, error: ERROR_MESSAGES.SOURCE_ACCOUNT_NOT_FOUND }
            }
            if (text.includes(ERROR_MESSAGES.DESTINATION_ACCOUNT_NOT_FOUND)) {
                return { success: false, error: ERROR_MESSAGES.DESTINATION_ACCOUNT_NOT_FOUND }
            }

            throw new Error(text)
        } catch (err) {
            if (err instanceof Error) {
                return { success: false, error: err.message }
            }

            console.error(err)
            return {
                success: false,
                error: "Unable to create transaction. Please review the inputs and try again shortly.",
            }
        }
    })
}
