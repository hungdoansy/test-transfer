<script lang="ts">
    import { cn } from "@/lib/utils"
    import type { HTMLButtonAttributes } from "svelte/elements"
    const { class: className, ...props }: HTMLButtonAttributes = $props()
</script>

<button
    class={cn(
        "px-4 py-2 rounded-lg font-semibold text-black bg-accent hover:bg-accent/80 transition-colors",
        className
    )}
    {...props}
>
    {#if props.children}
        {@render props.children()}
    {/if}
</button>
