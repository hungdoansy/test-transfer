<script lang="ts">
    import type { HTMLLabelAttributes } from "svelte/elements"
    import { cn } from "@/lib/utils"

    export type LabelProps = HTMLLabelAttributes & {
        required?: boolean
    }
    const { class: className, required, for: htmlFor, ...props }: LabelProps = $props()
</script>

<label for={htmlFor} class={cn("flex items-center gap-1 text-sm font-medium text-gray-700", className)} {...props}>
    {#if props.children}
        {@render props.children()}
    {/if}

    {#if required}
        <span class="h-fit text-red-500">*</span>
    {/if}
</label>
