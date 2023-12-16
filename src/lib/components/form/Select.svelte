<script>
    import { onMount } from 'svelte'
    import { slide } from 'svelte/transition'

    export let label = null

    export let options = []
    export let selected = options?.[0]

    const domOptions = {}

    let showOptions = false

    // when showOptions is updated to true then focus the currently selected item
    $: if (showOptions) domOptions[selected]?.focus()

    let thisSelect

    function select(option) {
        selected = option
        showOptions = false
    }

    onMount(() => {
        window.addEventListener('click', onClick)

        return () => window.removeEventListener('click', onClick)
    })

    function onClick(event) {
        // we only care if we are currently showing the options
        if (!showOptions) return

        // when the user clicks something outside of this select element
        // then we automatically close the menu
        if (!thisSelect.contains(event.target)) {
            showOptions = false
        }
    }

    let lastKeyPress = null
    let lastMatches = []

    // when the selection menu is reopened clear the previous values
    $: if (showOptions) {
        lastKeyPress = null
        lastMatches = []
    }

    function onKeyPress(event) {
        if (!showOptions) return

        // check if the currently focused element is within
        if (!thisSelect.contains(document.activeElement)) return

        const isRepeatKey = lastKeyPress === event.key

        const matched = options.find(option => {
            const startsWithKey = option
                .toString()
                .toLowerCase()
                .startsWith(event.key)

            // if the user is repeating a key then we don't want the previous ones
            return isRepeatKey
                ? startsWithKey && !lastMatches.includes(option)
                : startsWithKey
        })

        // when the user stops repeating a key then the previous matches do not matter
        if (!isRepeatKey) {
            lastMatches = []
        }

        lastKeyPress = event.key

        if (!matched) {
            // once there is nothing left to match then we can reset
            // the previous matches incase the user wants to go back
            lastMatches = []

            // we can run the event again
            onKeyPress(event)
            return
        }

        lastMatches.push(matched)

        domOptions[matched]?.focus()
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    bind:this={thisSelect}
    on:keypress={onKeyPress}
    class="relative {$$props.class}"
>
    {#if showOptions}
        <div
            transition:slide
            class="flex flex-col absolute left-1/2 -translate-x-1/2 bottom-full min-w-full whitespace-nowrap glass rounded-xl mb-2 drop-shadow-xl overflow-x-hidden overflow-y-scroll max-h-72"
        >
            {#each options as option (option)}
                <button
                    bind:this={domOptions[option]}
                    on:click={() => select(option)}
                    class="py-2 px-4 cursor-pointer focus:bg-glass hover:bg-glass
                    {option === selected && 'bg-glass'}"
                    type="button"
                >
                    {option}
                </button>
            {/each}
        </div>
    {/if}

    <button
        on:click={() => (showOptions = !showOptions)}
        class="hover:opacity-100 transition-opacity p-2
        {showOptions ? 'opacity-100' : 'opacity-75'}"
        type="button"
    >
        {#if label}
            <span class="font-semibold mr-1">{label}:</span>
        {/if}

        {selected}
    </button>
</div>
