<script lang="ts">
    import Big from "big.js"

    import Button from "@/components/ui/Button.svelte"
    import Input from "@/components/ui/Input.svelte"
    import Label from "@/components/ui/Label.svelte"
    import Tooltip from "@/components/ui/Tooltip.svelte"
    import TooltipContent from "@/components/ui/TooltipContent.svelte"
    import { CURRENCY_SYMBOL, MAXIMUM_FRACTION_LENGTH } from "@/constants"
    import { formatAmount, removeTrailingZeros } from "@/lib/format"
    import { cn } from "@/lib/utils"
    import { accountStore } from "@/stores/account.svelte"

    type TransferAmountInputProps = {
        accountId: number | undefined
        amount: string
        error: string | null | undefined
    }

    let { accountId, amount = $bindable(), error }: TransferAmountInputProps = $props()
    let accountBalance = $derived.by(() => {
        if (accountId) {
            return $accountStore.accounts.find(account => account.account_id === accountId)?.balance ?? ""
        }

        return ""
    })

    function setAmount(value: number) {
        amount = value.toString()
    }

    function setAmountByPercentage(percentage: number) {
        if (!accountBalance) {
            return
        }

        const calculatedAmount = Big(accountBalance).mul(percentage)
        amount = removeTrailingZeros(calculatedAmount.toFixed(10))
    }
</script>

<div class="space-y-2">
    <div class="flex items-center gap-2 justify-between">
        <Label for="amount" required>
            <Tooltip>
                Account
                {#snippet content()}
                    <TooltipContent>
                        This value is a non-negative integer no greater than the balance, with no more than {MAXIMUM_FRACTION_LENGTH}
                        decimal places.
                    </TooltipContent>
                {/snippet}
            </Tooltip>
        </Label>
        {#if accountId}
            <p class="text-sm text-gray-500">
                Available: <span class="font-medium text-indigo-700" title={accountBalance}
                    >{CURRENCY_SYMBOL} {formatAmount(accountBalance)}</span
                >
            </p>
        {/if}
    </div>

    <Input
        id="amount"
        class={cn("text-base font-mono", error && "text-red-500 border-red-500")}
        bind:value={amount}
        placeholder="0.00"
    />

    {#if error}
        <p class="text-sm text-red-500">{error}</p>
    {/if}

    <div class="grid grid-cols-4 sm:grid-cols-8 gap-3">
        <Button
            variant="flat"
            onclick={() => setAmount(100)}
            class="h-8 py-0 px-0 justify-center focus:outline-none focus:ring-0 focus:ring-offset-0 text-xs"
        >
            {CURRENCY_SYMBOL}100
        </Button>
        <Button
            variant="flat"
            onclick={() => setAmount(200)}
            class="h-8 py-0 px-0 justify-center focus:outline-none focus:ring-0 focus:ring-offset-0 text-xs"
        >
            {CURRENCY_SYMBOL}200
        </Button>
        <Button
            variant="flat"
            onclick={() => setAmount(500)}
            class="h-8 py-0 px-0 justify-center focus:outline-none focus:ring-0 focus:ring-offset-0 text-xs"
        >
            {CURRENCY_SYMBOL}500
        </Button>
        <Button
            variant="flat"
            onclick={() => setAmount(1000)}
            class="h-8 py-0 px-0 justify-center focus:outline-none focus:ring-0 focus:ring-offset-0 text-xs"
        >
            {CURRENCY_SYMBOL}1000
        </Button>
        <Button
            variant="flat"
            onclick={() => setAmountByPercentage(0.25)}
            class="h-8 py-0 relative group px-0 justify-center focus:outline-none focus:ring-0 focus:ring-offset-0 overflow-hidden text-xs"
        >
            <div
                class="absolute top-0 left-0 z-[1] w-[25%] h-full bg-indigo-200 transition-all duration-300 group-hover:bg-indigo-300"
            ></div>
            <span class="relative z-[2]">25%</span>
        </Button>
        <Button
            variant="flat"
            onclick={() => setAmountByPercentage(0.5)}
            class="h-8 py-0 relative group px-0 justify-center focus:outline-none focus:ring-0 focus:ring-offset-0 overflow-hidden text-xs"
        >
            <div
                class="absolute top-0 left-0 z-[1] w-[50%] h-full bg-indigo-200 transition-all duration-300 group-hover:bg-indigo-300"
            ></div>
            <span class="relative z-[2]">50%</span>
        </Button>
        <Button
            variant="flat"
            onclick={() => setAmountByPercentage(0.75)}
            class="h-8 py-0 relative group px-0 justify-center focus:outline-none focus:ring-0 focus:ring-offset-0 overflow-hidden text-xs"
        >
            <div
                class="absolute top-0 left-0 z-[1] w-[75%] h-full bg-indigo-200 transition-all duration-300 group-hover:bg-indigo-300"
            ></div>
            <span class="relative z-[2]">75%</span>
        </Button>
        <Button
            variant="flat"
            onclick={() => setAmountByPercentage(1)}
            class="h-8 py-0 px-0 justify-center bg-indigo-200 hover:bg-indigo-300 focus:outline-none focus:ring-0 focus:ring-offset-0 text-xs"
        >
            Max
        </Button>
    </div>
</div>
