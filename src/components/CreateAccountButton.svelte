<script lang="ts">
    import { ChevronDownIcon, PencilIcon, PlusIcon, ShuffleIcon } from "@lucide/svelte"
    import { toast } from "svelte-5-french-toast"

    import Button from "@/components/ui/Button.svelte"
    import Spinner from "@/components/ui/Spinner.svelte"
    import { ERROR_MESSAGES } from "@/constants/error"
    import { generateRandomAccount } from "@/lib/account"
    import { createAccount } from "@/stores/account.svelte"

    import CreateAccountModal from "./CreateAccountModal.svelte"

    let creatingAccount = $state(false)
    let isDropdownOpen = $state(false)
    let isModalOpen = $state(false)

    function clickOutside(node: HTMLDivElement) {
        const handleClick = (event: MouseEvent) => {
            if (!node.contains(event.target as Node)) {
                isDropdownOpen = false
            }
        }

        $effect(() => {
            document.addEventListener("click", handleClick, true)
            return () => {
                document.removeEventListener("click", handleClick, true)
            }
        })
    }

    async function createRandomAccount() {
        isDropdownOpen = false
        creatingAccount = true
        try {
            const account = generateRandomAccount()
            await createAccount(account.account_id, account.balance)
            toast.success("New account added")
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error(ERROR_MESSAGES.FAILED_TO_CREATE_ACCOUNT)
            }
        } finally {
            creatingAccount = false
        }
    }

    async function handleCreateAccount(method: "manual" | "random") {
        if (method === "manual") {
            isModalOpen = true
            isDropdownOpen = false
            return
        }

        await createRandomAccount()
    }

    function toggleDropdown(event: MouseEvent) {
        event.stopPropagation()
        isDropdownOpen = !isDropdownOpen
    }
</script>

<div class="relative" use:clickOutside>
    <Button onclick={toggleDropdown} disabled={creatingAccount}>
        {#if creatingAccount}
            <Spinner />
            <span class="hidden sm:block">Creating...</span>
        {:else}
            <PlusIcon class="flex-none size-4" />
            <span>Create Account</span>
            <ChevronDownIcon class="flex-none size-4" />
        {/if}
    </Button>

    {#if isDropdownOpen}
        <div
            class="absolute top-full right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
        >
            <div class="flex flex-col">
                <button
                    onclick={() => handleCreateAccount("manual")}
                    class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center gap-2"
                    role="menuitem"
                >
                    <PencilIcon class="size-4 flex-none" /> Manual
                </button>
                <button
                    onclick={() => handleCreateAccount("random")}
                    class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center gap-2"
                    role="menuitem"
                >
                    <ShuffleIcon class="size-4 flex-none" /> Random
                </button>
            </div>
        </div>
    {/if}
</div>

<CreateAccountModal bind:isOpen={isModalOpen} />
