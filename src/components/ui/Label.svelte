<script lang="ts">
    import type { HTMLLabelAttributes } from "svelte/elements"
    import { cn } from "@/lib/utils"

    type Props = HTMLLabelAttributes
    const { class: className, ...props }: Props = $props()
</script>

<label class={cn("text-sm font-medium text-gray-300", className)} {...props}>
    {#if props.children}
        {@render props.children()}
    {/if}
</label>
