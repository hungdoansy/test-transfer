<script lang="ts">
    import type { Snippet } from "svelte"

    import { cn } from "@/lib/utils"

    type TooltipProps = {
        class?: string
        children?: Snippet
        content?: Snippet
    }

    let { class: className, children, content }: TooltipProps = $props()
</script>

<div class="relative w-fit h-fit flex-none">
    <div
        class={cn(
            "peer border-b border-gray-300 border-dashed hover:border-gray-400 hover:border-solid transition-all",
            className
        )}
    >
        {#if children}
            {@render children()}
        {/if}
    </div>
    {#if content}
        {@render content()}
    {/if}
</div>
