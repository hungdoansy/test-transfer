<script lang="ts">
    import { ChevronDownIcon, CheckIcon, BoxIcon, InboxIcon } from "@lucide/svelte"

    import { cn } from "@/lib/utils"
    import { accountStore } from "@/stores/account.svelte"

    type AccountSelectProps = {
        value?: number
        onChange?: (accountId: number) => void
        disabled?: boolean
        class?: string
        placeholder?: string
        disabledAccount?: number
    }

    let {
        value,
        onChange,
        disabled = false,
        class: className = "",
        placeholder = "Select account",
    }: AccountSelectProps = $props()

    let isOpen = $state(false)
    let dropdownRef = $state<HTMLDivElement>()

    let selectedAccount = $derived.by(() =>
        value ? $accountStore.accounts.find(acc => acc.account_id === value) : undefined
    )

    function handleSelect(accountId: number) {
        if (onChange) {
            onChange(accountId)
        }
        isOpen = false
    }

    function clickOutside(node: HTMLDivElement) {
        const handleClick = (event: MouseEvent) => {
            if (!node.contains(event.target as Node)) {
                isOpen = false
            }
        }

        $effect(() => {
            document.addEventListener("click", handleClick, true)
            return () => {
                document.removeEventListener("click", handleClick, true)
            }
        })
    }
</script>

<div class="relative" bind:this={dropdownRef} use:clickOutside>
    <button
        type="button"
        onclick={() => {
            if (!disabled && $accountStore.isReady) {
                isOpen = !isOpen
            }
        }}
        disabled={disabled || !$accountStore.isReady}
        class={cn(
            "w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 hover:bg-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between",
            className
        )}
    >
        {#if selectedAccount}
            <span class="flex items-center gap-2">
                <span class="font-mono text-gray-800">
                    #{selectedAccount.account_id.toString()}
                </span>
            </span>
        {:else}
            <span class="text-gray-500">{placeholder}</span>
        {/if}
        <ChevronDownIcon class="size-4 text-gray-400" />
    </button>

    {#if isOpen}
        <div
            class="absolute z-10 top-full right-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
        >
            {#if $accountStore.accounts.length === 0}
                <div class="h-[120px] flex flex-col gap-3 items-center justify-center px-3 py-2 text-gray-500">
                    <InboxIcon class="text-gray-400 size-8 flex-none" />
                    <p class="text-xs text-center text-balance">
                        No accounts found.<br />Please create an account first.
                    </p>
                </div>
            {:else}
                {#each $accountStore.accounts as account}
                    <button
                        type="button"
                        onclick={() => handleSelect(account.account_id)}
                        class={cn(
                            "w-full px-3 py-2 flex items-center justify-between hover:bg-gray-100 transition-colors duration-200",
                            account.account_id === value && "bg-blue-50"
                        )}
                    >
                        <span class="font-mono text-gray-800">
                            #{account.account_id.toString()}
                        </span>
                        <CheckIcon
                            class={cn("size-4 text-blue-600 invisible", account.account_id === value && "visible")}
                        />
                    </button>
                {/each}
            {/if}
        </div>
    {/if}
</div>
