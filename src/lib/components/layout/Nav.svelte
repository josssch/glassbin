<script>
    import { routes } from '$lib/routes.js'
    import { slide } from 'svelte/transition'
    import GlassTitle from '../GlassTitle.svelte'
</script>

<div
    class="fixed top-0 right-6 overflow-hidden rounded-b-xl z-[100]"
    transition:slide={{ axis: 'y' }}
>
    <div
        class="px-4 py-2 glass !border-t-0 rounded-b-xl overflow-hidden h-16 hover:h-24"
    >
        <a href="/">
            <GlassTitle>glass.</GlassTitle>
        </a>

        <div
            class="flex gap-1 items-center text-white/30 hover:text-white/50 transition-colors mt-4"
        >
            {#each routes as route}
                <a href={route.href}><i class={route.icon}></i></a>
            {/each}
        </div>
    </div>

    <div
        class="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-rose-800/50 to-transparent -z-50"
    ></div>
</div>
