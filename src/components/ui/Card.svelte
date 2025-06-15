<script lang="ts">
    import type { Snippet } from "svelte"

    import { cn } from "@/lib/utils"

    type CardProps = {
        class?: string
        children?: Snippet
    }

    let { class: className, children }: CardProps = $props()
</script>

<div class={cn("h-fit p-4 sm:p-6 bg-white rounded-xl border border-gray-200", className)}>
    {#if children}
        {@render children()}
    {/if}
</div>
