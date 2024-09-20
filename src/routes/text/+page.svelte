<script>
    import { page } from '$app/stores'
    import Editor from '$lib/components/editor/Editor.svelte'
    import GlassButton from '$lib/components/form/GlassButton.svelte'
    import Fullscreen from '$lib/components/layout/Fullscreen.svelte'
    import { getLanguageFileExt, languageFromFileName } from '$lib/highlight'
    import { editorOptions } from '$lib/store/editor-options'
    import { onMount } from 'svelte'

    export let form

    let title = form?.title || ''
    let code = form?.code || ''

    let editorForm

    let languageOption = form?.language || 'auto'
    let detectedLanguage = ''

    $: {
        const fileNameLang = languageFromFileName(title)
        if (fileNameLang) languageOption = fileNameLang
    }

    let placeholderTitle = 'snippet'
    $: if (!title) {
        const ext = getLanguageFileExt(
            languageOption === 'auto' ? detectedLanguage : languageOption,
        )

        placeholderTitle = ext ? `snippet.${ext}` : 'snippet'
    }

    onMount(() => {
        if ($page.state.post) {
            ;({ title, code, language: languageOption } = $page.state.post)
            delete $page.state.post
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

<Fullscreen class="flex-col gap-2">
    {#if form?.error}
        <p class="font-medium text-red-600 mb-4">error: {form.error}</p>
    {/if}

    <form
        bind:this={editorForm}
        class="flex-1 relative flex flex-col gap-2"
        method="post"
        on:formdata={({ formData }) => {
            // default title to the preview title as a default
            if (!formData.get('title')) {
                formData.set('title', placeholderTitle)
            }
        }}
    >
        <input
            class="glass rounded-xl px-4 py-2 font-mono text-center text-white/50 focus:text-white w-72 placeholder:text-white/50"
            name="title"
            placeholder={placeholderTitle}
            bind:value={title}
        />

        <Editor
            bind:code
            name="code"
            bind:editorOptions={$editorOptions}
            bind:language={languageOption}
            bind:detectedLanguage
            on:submit={onSubmit}
            autofocus
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
</Fullscreen>
