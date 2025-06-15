import Big from "big.js"

import { MAXIMUM_FRACTION_LENGTH, MAXIMUM_ID, MAXIMUM_INITIAL_BALANCE } from "@/constants"
import { formatInteger, removeTrailingZeros } from "@/lib/format"
import type { Account } from "@/types"

const validIntegerRegex = /^-?\d+$/
const validNumberRegex = /^\d*\.?\d*$/

export function generateRandomAccount(): Account {
    const id = Math.floor(Math.random() * 999_999) + 1
    const balance = removeTrailingZeros((Math.random() * (10_000_000 - 100) + 100).toFixed(4))
    return { account_id: id, balance }
}

export function validateAccountId(accountId: string): string | null {
    const id = parseInt(accountId)

    if (!validIntegerRegex.test(accountId) || isNaN(id)) {
        return "Invalid account ID. Please enter an integer number (e.g., 12345)."
    }

    if (id < 0) {
        return "Account ID must be a non-negative number (0 or greater)."
    }

    if (id > MAXIMUM_ID) {
        return `Account ID must not exceed ${formatInteger(MAXIMUM_ID)}. Please use a smaller number.`
    }

    return null
}

export function validateBalance(value: string): string | null {
    const parsedValue = Number(value)

    if (!value) {
        return "Balance is required. Please enter a starting amount."
    }

    if (!validNumberRegex.test(value) || Number.isNaN(parsedValue)) {
        return "Invalid balance format. Only numeric input is allowed (e.g., 12345.678)."
    }

    if (parsedValue < 0) {
        return "Balance must be a non-negative number (0 or greater)."
    }

    if (value.includes(".")) {
        const fractionalPart = value.split(".")[1]
        if (fractionalPart.length > MAXIMUM_FRACTION_LENGTH) {
            return `Too many decimals. Maximum allowed is ${MAXIMUM_FRACTION_LENGTH} digits after the decimal point.`
        }
    }

    if (parsedValue > MAXIMUM_INITIAL_BALANCE) {
        return `Balance must not exceed ${formatInteger(MAXIMUM_INITIAL_BALANCE)}. Please enter a smaller amount.`
    }

    return null
}

export function validateTransferAmount(value: string, balance?: string): string | null {
    const parsedValue = Number(value)

    if (!value) {
        return "Amount is required. Please enter how much you want to transfer."
    }

    if (!validNumberRegex.test(value) || Number.isNaN(parsedValue)) {
        return "Invalid amount format. Only numeric input is allowed (e.g., 25172.59)."
    }

    if (parsedValue < 0) {
        return "Amount must be a non-negative number (0 or greater)."
    }

    if (value.includes(".")) {
        const fractionalPart = value.split(".")[1]
        if (fractionalPart.length > MAXIMUM_FRACTION_LENGTH) {
            return `Too many decimals. Maximum allowed is ${MAXIMUM_FRACTION_LENGTH} digits after the decimal point.`
        }
    }

    if (typeof balance !== "undefined" && Big(balance).lt(value)) {
        return "Insufficient balance. Please enter a smaller amount within the available balance."
    }

    return null
}
