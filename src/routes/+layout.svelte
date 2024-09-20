<script>
    import { page } from '$app/stores'
    import Background from '$lib/components/layout/Background.svelte'
    import Footer from '$lib/components/layout/Footer.svelte'
    import Nav from '$lib/components/layout/Nav.svelte'

    import '../default.css'
    import '../icons.css'
</script>

<svelte:head>
    <title>glassbin</title>
</svelte:head>

<div class="relative font-sans font-thin">
    {#if $page.url.pathname !== '/'}
        <Nav />
    {/if}

    <slot />

    <Footer />
</div>
