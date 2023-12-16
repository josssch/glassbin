<script>
    import { createEventDispatcher } from 'svelte'

    export let icon = null
    export let text = null

    export let disabled = false

    $: isOnlyIcon = icon && !text

    const dispatch = createEventDispatcher()
</script>

<button
    class="flex items-center gap-2 px-4 py-2 glass glass--hover rounded-xl font-medium
    {isOnlyIcon && 'aspect-square'} {$$props.class}"
    on:click={() => dispatch('click')}
    {disabled}
    type="button"
>
    {#if icon}
        <i class={icon}></i>
    {/if}

    {#if text}
        <span>{text}</span>
    {/if}
</button>
