<script>
    import { page } from '$app/stores'
    import Footer from '$lib/components/layout/Footer.svelte'
    import Nav from '$lib/components/layout/Nav.svelte'
    import { createMetaTagPairs } from '$lib/page-meta'

    import '../default.css'
    import '../icons.css'

    $: meta = createMetaTagPairs($page.data.meta)
</script>

<svelte:head>
    {#each meta as [name, content] (name)}
        {#if name === 'title'}
            <title>{content}</title>
        {/if}

        <meta property={name} {name} {content} />
    {/each}
</svelte:head>

<div class="relative font-sans font-thin">
    {#if $page.url.pathname !== '/'}
        <Nav />
    {/if}

    <slot />

    <Footer />
</div>
