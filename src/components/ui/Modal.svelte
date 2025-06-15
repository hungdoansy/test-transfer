<script lang="ts">
    import { cn } from "@/lib/utils"

    type ModalProps = {
        open: boolean
        class?: string
        children?: () => any
    }

    let { open = $bindable(), class: className = $bindable(), children }: ModalProps = $props()

    function clickOutside(node: HTMLDivElement) {
        const handleClick = (event: MouseEvent) => {
            if (!node.contains(event.target as Node)) {
                open = false
            }
        }

        $effect(() => {
            document.addEventListener("click", handleClick, true)
            return () => {
                document.removeEventListener("click", handleClick, true)
            }
        })
    }

    function escape(node: HTMLDivElement) {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                open = false
            }
        }

        $effect(() => {
            document.addEventListener("keydown", handleEscape, true)
            return () => {
                document.removeEventListener("keydown", handleEscape, true)
            }
        })
    }
</script>

{#if open}
    <div class="fixed inset-0 bg-black/80 z-[999]"></div>
    <div
        class={cn(
            `flex flex-col w-full max-w-[95vw] max-h-[90vh] rounded-lg divide-y text-gray-500 border border-gray-200 divide-gray-200 bg-white pointer-events-auto fixed z-[1000] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`,
            className
        )}
        tabindex="-1"
        use:clickOutside
        use:escape
    >
        {@render children?.()}
    </div>
{/if}
