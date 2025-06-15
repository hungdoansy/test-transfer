<script lang="ts">
    import type { Snippet } from "svelte"

    import { cn } from "@/lib/utils"

    type ButtonProps = {
        variant?: "primary" | "outline" | "flat"
        type?: "button" | "submit" | "reset"
        disabled?: boolean
        class?: string
        children?: Snippet
        onclick?: (e: MouseEvent) => void
    }

    let {
        variant = "primary",
        type = "button",
        disabled = false,
        class: className = "",
        onclick,
        ...props
    }: ButtonProps = $props()
</script>

<button
    {type}
    {disabled}
    class={cn(
        "px-4 h-10 flex items-center gap-2 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "primary" &&
            "bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600",
        variant === "outline" && "text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-300",
        variant === "flat" && "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300",
        className
    )}
    {onclick}
>
    {#if props.children}
        {@render props.children()}
    {/if}
</button>
