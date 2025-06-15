<script lang="ts">
    import { onMount } from "svelte"

    import { CURRENCY_SYMBOL } from "@/constants"
    import { formatAmount } from "@/lib/format"
    import type { Account } from "@/types"

    type AccountCardProps = {
        account: Account
    }

    let props: AccountCardProps = $props()

    const account = $derived(props.account)

    let isHighlighted = $state(false)
    let previousBalance = $state(account.balance)

    $effect(() => {
        if (account.balance !== previousBalance) {
            isHighlighted = true
            setTimeout(() => {
                isHighlighted = false
            }, 1000)
            previousBalance = account.balance
        }
    })

    onMount(() => {
        isHighlighted = true
        setTimeout(() => {
            isHighlighted = false
        }, 1000)
    })
</script>

<div
    class="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 {isHighlighted
        ? 'animate-highlight'
        : ''}"
>
    <p class="font-mono text-gray-800 font-medium">
        #{account.account_id.toString()}
    </p>
    <span class="text-xl font-bold text-indigo-700" title={account.balance}>
        {CURRENCY_SYMBOL}
        {formatAmount(account.balance)}
    </span>
</div>

<style>
    @keyframes highlight {
        0% {
            background-color: rgb(211, 214, 255);
        }
        100% {
            background-color: rgb(249 250 251);
        }
    }

    .animate-highlight {
        animation: highlight 1s ease-out;
    }
</style>
