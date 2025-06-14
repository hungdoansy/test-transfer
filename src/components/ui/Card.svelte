<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements"
    import { cn } from "@/lib/utils"
    const { class: className, ...props }: HTMLAttributes<HTMLDivElement> = $props()
</script>

<div class={cn("p-4 sm:p-6 rounded-xl border", className)} {...props}>
    {#if props.children}
        {@render props.children()}
    {/if}
</div>
