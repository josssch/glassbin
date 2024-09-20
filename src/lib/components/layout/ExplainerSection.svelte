<script>
    export let id
    export let title
</script>

<section class="max-w-4xl {$$props.class}" {id}>
    <h1 class="text-3xl font-bold mb-4">
        <a href="#{id}">{title}</a>
    </h1>

    <span>
        <slot />
    </span>
</section>
