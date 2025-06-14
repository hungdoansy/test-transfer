<script lang="ts">
    import { cn } from "@/lib/utils"
    import type { HTMLInputAttributes } from "svelte/elements"

    type Props = HTMLInputAttributes
    const { class: className, ...props }: Props = $props()
</script>

<input
    class={cn(
        "w-full px-4 h-9 rounded-md border bg-[#1a1a1a] text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#48ff91] focus:border-[#48ff91] transition-all duration-200",
        className
    )}
    {...props}
/>
