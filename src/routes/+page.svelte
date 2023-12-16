<script>
    import GlassCard from '$lib/components/GlassCard.svelte'
    import Fullscreen from '$lib/components/layout/Fullscreen.svelte'
    import { routes } from '$lib/routes.js'
</script>

<Fullscreen class="items-center justify-center">
    <div class="grid lg:grid-cols-2 gap-4">
        {#each routes as route (route.href)}
            <GlassCard {...route} />
        {/each}
    </div>
</Fullscreen>
