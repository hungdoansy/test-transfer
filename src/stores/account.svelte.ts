import { derived, writable } from "svelte/store"

import { ACCOUNTS_STORAGE_KEY } from "@/constants"
import { splitToChunks } from "@/lib/list"
import type { Account } from "@/types"
import {
    createAccount as createAccountService,
    createTransaction,
    getAccountBalance as getAccountBalanceService,
} from "@/services/accountService"

type AccountStoreState = {
    isReady: boolean
    accounts: Account[]
}

const accountStore = writable<AccountStoreState>({
    isReady: false,
    accounts: [],
})

const { set, update } = accountStore
const accounts = derived(accountStore, state => state.accounts)
const isReady = derived(accountStore, state => state.isReady)

const getStoredAccounts = (): number[] => {
    const accounts = localStorage.getItem(ACCOUNTS_STORAGE_KEY)
    return accounts ? JSON.parse(accounts) : ([] as number[])
}

const storeAccountsToLocalStorage = (accounts: Account[]) => {
    const accountIDs = accounts.map(account => account.account_id)
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accountIDs))
}

// Load accounts from localStorage on store creation
const loadStoredAccounts = async () => {
    set({ isReady: false, accounts: [] })
    const accountIds = getStoredAccounts()
    const accounts: Account[] = []

    const chunks = splitToChunks(accountIds, 10)

    for (const chunk of chunks) {
        const responses = await Promise.all(chunk.map(id => getAccountBalanceService(id)))
        for (const response of responses) {
            if (response.success) {
                accounts.push(response.data)
            }
        }
    }

    set({ isReady: true, accounts })
}

// Create a new account
const createAccount = async (accountId: number, balance: string) => {
    const response = await createAccountService(accountId, balance)

    if (response.success) {
        const account = response.data
        update(state => ({ ...state, accounts: [...state.accounts, account] }))
        return account
    }

    throw new Error(response.error)
}

// Fetch balance for a specific account
const fetchAccountBalance = async (accountId: number) => {
    const response = await getAccountBalanceService(accountId)

    if (response.success) {
        const updatedAccount = response.data
        update(state => ({
            ...state,
            accounts: state.accounts.map(acc => (acc.account_id === accountId ? updatedAccount : acc)),
        }))
        return updatedAccount
    }

    throw new Error(response.error)
}

const transfer = async (sourceAccountId: number, destinationAccountId: number, amount: string) => {
    const response = await createTransaction({
        source_account_id: sourceAccountId,
        destination_account_id: destinationAccountId,
        amount,
    })

    if (response.success) {
        fetchAccountBalance(sourceAccountId)
        fetchAccountBalance(destinationAccountId)
        return response.data
    }

    throw new Error(response.error)
}

// Store accounts to localStorage on change
isReady.subscribe(ready => {
    if (ready) {
        accounts.subscribe(values => {
            storeAccountsToLocalStorage(values)
        })
    }
})

export { accountStore, loadStoredAccounts, createAccount, fetchAccountBalance, transfer }
