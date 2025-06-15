<script lang="ts">
    import type { Snippet } from "svelte"

    import { cn } from "@/lib/utils"

    type TooltipContentProps = {
        class?: string
        children?: Snippet
    }

    let { class: className, children }: TooltipContentProps = $props()
</script>

<div
    class={cn(
        "z-[2] w-[240px] px-2 py-1.5 absolute bottom-6 -left-3 hidden peer-hover:flex border bg-white rounded text-xs font-medium text-balance shadow-lg",
        className
    )}
>
    {#if children}
        {@render children()}
    {/if}
</div>
