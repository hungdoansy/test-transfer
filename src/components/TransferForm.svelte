<script lang="ts">
    import { ArrowDownUpIcon, ArrowLeftRightIcon } from "@lucide/svelte"
    import { toast } from "svelte-5-french-toast"

    import AccountSelect from "@/components/AccountSelect.svelte"
    import Button from "@/components/ui/Button.svelte"
    import Card from "@/components/ui/Card.svelte"
    import Label from "@/components/ui/Label.svelte"
    import TransferAmountInput from "@/components/TransferAmountInput.svelte"
    import { CURRENCY_SYMBOL } from "@/constants"
    import { validateTransferAmount } from "@/lib/account"
    import { formatAmountShorthand } from "@/lib/format"
    import { accountStore, transfer } from "@/stores/account.svelte"

    type TransferFormProps = {
        class?: string
    }

    let { class: className }: TransferFormProps = $props()

    let fromAccount = $state<number>()
    let toAccount = $state<number>()
    let amount = $state("")
    let fromAccountBalance = $derived.by(() => {
        if (fromAccount) {
            return $accountStore.accounts.find(account => account.account_id === fromAccount)?.balance ?? ""
        }

        return ""
    })

    let isLoading = $state(false)
    let showError = $state(false)

    let inputError = $derived(validateTransferAmount(amount, fromAccountBalance))
    let isValid = $derived(fromAccount && toAccount && amount && fromAccount !== toAccount && !inputError)

    function handleFlip() {
        ;[fromAccount, toAccount] = [toAccount, fromAccount]
    }

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault()

        showError = true

        if (!isValid) return

        isLoading = true
        try {
            await transfer(fromAccount!, toAccount!, amount)
            toast.success(
                `Transferred ${CURRENCY_SYMBOL + formatAmountShorthand(Number(amount))} from #${fromAccount} to #${toAccount}`
            )
            amount = ""
            showError = false
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to transfer")
        } finally {
            isLoading = false
        }
    }
</script>

<Card class={className}>
    <div class="mb-6">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-800">Transfer</h2>
    </div>

    <form onsubmit={handleSubmit} class="space-y-8">
        <div class="flex flex-col md:flex-row gap-2 md:gap-6">
            <div class="flex-1 space-y-2">
                <Label for="from" required>From</Label>
                <AccountSelect
                    value={fromAccount}
                    onChange={value => {
                        if (value === toAccount) {
                            ;[fromAccount, toAccount] = [toAccount, fromAccount]
                            return
                        }

                        fromAccount = value
                    }}
                />
                {#if showError && !fromAccount}
                    <p class="text-sm text-red-500">From account is required</p>
                {/if}
            </div>

            <button
                type="button"
                onclick={handleFlip}
                class="hidden md:flex mt-7 flex-none size-10 bg-gray-50 rounded-full border hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
                <ArrowLeftRightIcon class="flex-none size-4" />
            </button>

            <button
                type="button"
                onclick={handleFlip}
                class="mx-auto flex md:hidden flex-none size-10 bg-gray-50 rounded-full border hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
                <ArrowDownUpIcon class="size-4" />
            </button>

            <div class="flex-1 space-y-2">
                <Label for="to" required>To</Label>
                <AccountSelect
                    value={toAccount}
                    onChange={value => {
                        if (value === fromAccount) {
                            ;[fromAccount, toAccount] = [toAccount, fromAccount]
                            return
                        }

                        toAccount = value
                    }}
                />
                {#if showError && !toAccount}
                    <p class="text-sm text-red-500">To account is required</p>
                {/if}
            </div>
        </div>

        <TransferAmountInput accountId={fromAccount} bind:amount error={showError ? inputError : ""} />

        <div class="flex justify-end">
            <Button type="submit" disabled={(showError && !isValid) || isLoading}>
                {isLoading ? "Transferring..." : "Transfer"}
            </Button>
        </div>
    </form>
</Card>
