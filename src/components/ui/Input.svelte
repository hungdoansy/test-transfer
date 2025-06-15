<script lang="ts">
    import { cn } from "@/lib/utils"

    type InputProps = {
        id?: string
        class?: string
        value?: string
        placeholder?: string
        required?: boolean
        type?: string
        step?: string
        disabled?: boolean
        oninput?: (e: Event) => void
    }

    let {
        id,
        class: className = "",
        value = $bindable(),
        placeholder,
        required,
        type,
        step,
        disabled,
        oninput,
    }: InputProps = $props()
</script>

<input
    {id}
    class={cn("block h-8 w-full border-b border-gray-300 text-sm focus:outline-none text-gray-700", className)}
    bind:value
    {placeholder}
    {required}
    {type}
    {step}
    {disabled}
    {oninput}
/>
