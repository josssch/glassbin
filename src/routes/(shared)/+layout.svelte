<script>
    export let data

    $: ({ post } = data)
</script>

<svelte:head>
    <meta property="og:title" content="" />
    <meta property="og:description" content="" />
    <meta property="og:url" content="" />

    <meta property="og:image" content="" />

    <meta property="theme-color" content="" />
</svelte:head>

<slot />
