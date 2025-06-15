<script lang="ts">
    import { InboxIcon } from "@lucide/svelte"
    import { derived } from "svelte/store"

    import AccountCard from "@/components/AccountCard.svelte"
    import Card from "@/components/ui/Card.svelte"
    import { accountStore, loadStoredAccounts } from "@/stores/account.svelte"

    import CreateAccountButton from "./CreateAccountButton.svelte"

    type AccountManagerProps = {
        class?: string
    }

    let { class: className }: AccountManagerProps = $props()

    const isReady = derived(accountStore, $store => $store.isReady)
    const accounts = derived(accountStore, $store => $store.accounts)

    $effect(() => {
        loadStoredAccounts()
    })
</script>

<Card class={className}>
    <div class="flex justify-between items-center mb-6">
        <div class="flex-none flex flex-col gap-1">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800">Accounts</h2>
        </div>
        <CreateAccountButton />
    </div>

    {#if !$isReady}
        <div class="space-y-3">
            {#each Array(5) as _}
                <div class="h-16 bg-gray-100 animate-pulse rounded-lg"></div>
            {/each}
        </div>
    {:else if $accounts.length === 0}
        <div class="text-center py-12">
            <InboxIcon class="text-gray-400 mb-2 size-12 mx-auto" />
            <p class="text-sm text-gray-500">No accounts found. Create one to get started!</p>
        </div>
    {:else}
        <div class="space-y-3">
            {#each $accounts as account}
                <AccountCard {account} />
            {/each}
        </div>
    {/if}
</Card>
