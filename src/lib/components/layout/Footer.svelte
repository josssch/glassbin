<script>
    const links = [
        {
            title: 'who?',
            href: '/',
        },
        {
            title: 'what?',
            href: '/',
        },
        {
            title: 'how?',
            href: '/',
        },
    ]
</script>

<div class="flex">
    <div class="flex gap-6 mx-auto px-8 py-4 rounded-t-xl glass !border-b-0">
        {#each links as link}
            <a href={link.href} class="hover:underline">{link.title}</a>
        {/each}
    </div>
</div>
