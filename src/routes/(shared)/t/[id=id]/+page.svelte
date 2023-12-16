<script>
    import GlassButton from '$lib/components/form/GlassButton.svelte'
    import VerticalFullscreen from '$lib/components/layout/VerticalFullscreen.svelte'
    import { highlight } from '$lib/highlight.js'
    import { redirectWithData } from '$lib/store.js'

    export let data

    $: ({ post } = data)

    $: ({ language, value: highlighted } = highlight({
        code: post.code,
        language: post.language,
    }))

    function copyToClipboard() {
        if (!navigator.clipboard) return

        navigator.clipboard.writeText(post.code)
    }

    function edit() {
        redirectWithData('/text', post)
    }
</script>

<VerticalFullscreen class="gap-2 max-h-screen">
    <!-- code view -->
    <pre
        class="block glass p-6 rounded-xl font-mono grow overflow-scroll">{@html highlighted}</pre>

    <div class="flex gap-2 text-sm">
        <GlassButton
            text="Copy to Clipboard"
            icon="fi fi-sr-clipboard"
            on:click={copyToClipboard}
        />

        <GlassButton
            text="Duplicate/Edit"
            icon="fi fi-sr-duplicate"
            on:click={edit}
        />
    </div>
</VerticalFullscreen>
