<script>
    import Editor from '$lib/components/editor/Editor.svelte'
    import GlassButton from '$lib/components/form/GlassButton.svelte'
    import VerticalFullscreen from '$lib/components/layout/VerticalFullscreen.svelte'
    import { transfer } from '$lib/store.js'
    import { onMount } from 'svelte'

    let title = ''
    let code = ''

    let editorForm
    let language

    let detectedLanguage

    const autoFocus = el => el?.focus?.()

    onMount(() => {
        if ($transfer) {
            ;({ code, language } = $transfer)
            transfer.set(null)
        }
    })

    const actions = [
        {
            text: 'Save',
            icon: 'fi fi-sr-disk',
            action: onSubmit,
            disabled: true,
        },
    ]

    $: actions[0].disabled = code.length === 0

    function onSubmit() {
        if (actions[0].disabled) {
            return
        }

        editorForm.submit()
    }
</script>

<VerticalFullscreen class="gap-2">
    <!-- <h1 class="font-bold text-3xl">Write</h1> -->
    <!-- <p class="font-light mb-4">paste your code below</p> -->

    <form
        bind:this={editorForm}
        class="grow relative flex flex-col gap-2"
        method="post"
    >
        <input
            class="glass rounded-xl px-4 py-2 font-mono text-center text-white/50 focus:text-white w-72"
            name="title"
            placeholder="new file"
            bind:value={title}
            use:autoFocus
        />

        <Editor
            bind:code
            name="code"
            bind:language
            bind:detectedLanguage
            on:submit={onSubmit}
        >
            <div class="flex gap-2 grow" slot="actions">
                {#each actions as action (action.text)}
                    <GlassButton
                        text={action.text}
                        icon={action.icon}
                        on:click={action.action}
                        disabled={action.disabled}
                    />
                {/each}
            </div>
        </Editor>

        <input type="hidden" name="language" bind:value={detectedLanguage} />
    </form>
</VerticalFullscreen>
