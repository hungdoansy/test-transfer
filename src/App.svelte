<script lang="ts">
    import { Toaster } from "svelte-5-french-toast"

    import AccountManager from "@/components/AccountManager.svelte"
    import TransferForm from "@/components/TransferForm.svelte"
</script>

<main class="w-full min-h-screen bg-white py-12 flex flex-col items-center">
    <div class="px-4 lg:px-0 flex flex-col gap-10 w-full md:max-w-4xl md:min-w-[560px] lg:max-w-5xl lg:min-w-[640px]">
        <h1 class="text-center text-4xl font-bold gradient-primary bg-clip-text text-transparent">Internal Transfer</h1>

        <div class="w-full flex flex-col lg:flex-row gap-8">
            <AccountManager class="flex-none w-full lg:w-auto lg:flex-1 max-w-[420px]" />
            <TransferForm class="flex-1" />
        </div>
    </div>
</main>

<Toaster
    position="top-right"
    toastOptions={{
        duration: 5_000,
    }}
/>
