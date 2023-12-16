<script>
    import Fullscreen from './Fullscreen.svelte'
</script>

<Fullscreen class="flex-col {$$props.class}">
    <slot />
</Fullscreen>
