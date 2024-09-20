<script>
    const links = [
        {
            title: 'who?',
            href: '/faq#who',
        },
        {
            title: 'what?',
            href: '/faq#what',
        },
        {
            title: 'how?',
            href: '/faq#how',
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
