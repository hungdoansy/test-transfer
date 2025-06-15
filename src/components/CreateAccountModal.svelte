<script lang="ts">
    import { XIcon } from "@lucide/svelte"
    import toast from "svelte-5-french-toast"

    import Button from "@/components/ui/Button.svelte"
    import Input from "@/components/ui/Input.svelte"
    import Label from "@/components/ui/Label.svelte"
    import Dialog from "@/components/ui/Modal.svelte"
    import Tooltip from "@/components/ui/Tooltip.svelte"
    import TooltipContent from "@/components/ui/TooltipContent.svelte"
    import { MAXIMUM_FRACTION_LENGTH, MAXIMUM_ID, MAXIMUM_INITIAL_BALANCE } from "@/constants"
    import { ERROR_MESSAGES } from "@/constants/error"
    import { validateAccountId, validateBalance } from "@/lib/account"
    import { formatInteger } from "@/lib/format"
    import { createAccount } from "@/stores/account.svelte"

    type CreateAccountModalProps = {
        isOpen: boolean
    }

    let { isOpen = $bindable() }: CreateAccountModalProps = $props()

    let accountId = $state("")
    let balance = $state("")

    let isLoading = $state(false)
    let showError = $state(false)

    let errorAccountId = $derived.by(() => validateAccountId(accountId))
    let errorBalance = $derived.by(() => validateBalance(balance))

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault()

        showError = true
        if (errorAccountId || errorBalance) {
            return
        }

        isLoading = true
        try {
            await createAccount(Number(accountId), balance)
            toast.success("New account added")
            isOpen = false
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error(ERROR_MESSAGES.FAILED_TO_CREATE_ACCOUNT)
            }
        } finally {
            isLoading = false
        }
    }

    function handleClose() {
        isOpen = false
    }

    $effect(() => {
        if (!isOpen) {
            accountId = ""
            balance = ""
            showError = false
        }
    })
</script>

<Dialog bind:open={isOpen} class="sm:max-w-md">
    <div class="flex items-center justify-between p-4">
        <h3 class="text-lg font-semibold text-gray-900">Create Account</h3>
        <button onclick={handleClose} class="text-gray-400 hover:text-gray-500">
            <XIcon class="size-5" />
        </button>
    </div>
    <form onsubmit={handleSubmit} class="p-4 space-y-8">
        <div class="flex flex-col gap-1">
            <Label for="accountId" required>
                <Tooltip>
                    Account ID
                    {#snippet content()}
                        <TooltipContent>
                            This value is a non-negative integer no greater than {formatInteger(MAXIMUM_ID)}.
                        </TooltipContent>
                    {/snippet}
                </Tooltip>
            </Label>
            <Input id="accountId" bind:value={accountId} required placeholder="account ID" disabled={isLoading} />
            {#if showError && errorAccountId}
                <p class="text-red-500 text-sm">{errorAccountId}</p>
            {/if}
        </div>

        <div class="flex flex-col gap-1">
            <Label for="balance" required>
                <Tooltip>
                    Initial balance
                    {#snippet content()}
                        <TooltipContent>
                            This value is a non-negative number no greater than {formatInteger(
                                MAXIMUM_INITIAL_BALANCE
                            )}, with no more than {MAXIMUM_FRACTION_LENGTH} decimal places..
                        </TooltipContent>
                    {/snippet}
                </Tooltip>
            </Label>
            <Input id="balance" bind:value={balance} required placeholder="0.00" disabled={isLoading} />
            {#if showError && errorBalance}
                <p class="text-red-500 text-sm">{errorBalance}</p>
            {/if}
        </div>

        <p class="text-sm font-medium text-gray-500">
            Note: If the account already exists, it will be added to the list with the current balance.
        </p>

        <div class="flex justify-end gap-3 pt-4">
            <Button variant="outline" onclick={handleClose}>Cancel</Button>
            <Button type="submit" disabled={isLoading || Boolean(showError && (errorAccountId || errorBalance))}>
                {isLoading ? "Creating..." : "Create Account"}
            </Button>
        </div>
    </form>
</Dialog>
