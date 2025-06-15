import { MAXIMUM_FRACTION_LENGTH } from "@/constants"

export function formatAmountShorthand(amount: number) {
    return new Intl.NumberFormat("en-US", {
        notation: "compact",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount)
}

export function formatInteger(amount: string | number) {
    return new Intl.NumberFormat("en-US", {
        useGrouping: "true",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(Number(amount))
}

export function formatAmount(amount: string) {
    return new Intl.NumberFormat("en-US", {
        useGrouping: "true",
        minimumFractionDigits: 0,
        maximumFractionDigits: MAXIMUM_FRACTION_LENGTH,
    }).format(Number(amount))
}

export function removeTrailingZeros(numStr: string) {
    return numStr.includes(".") ? numStr.replace(/\.?0+$/, "") : numStr
}
