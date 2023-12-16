<script>
    import { page } from '$app/stores'
    import VerticalFullscreen from '$lib/components/layout/VerticalFullscreen.svelte'
</script>

<VerticalFullscreen>
    <h1>{$page.status}</h1>

    <p>{$page.error.message}</p>
</VerticalFullscreen>
