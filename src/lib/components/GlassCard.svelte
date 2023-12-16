<script>
    export let icon

    export let title
    export let desc = ''

    export let href
</script>

<a
    {href}
    class="flex flex-col gap-2 items-center justify-center px-6 py-8 glass rounded-xl shadow-lg cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
>
    <i class="{icon} text-white text-6xl"></i>

    <h1 class="font-semibold text-xl text-white whitespace-nowrap">{title}</h1>
    <p class="opacity-75 max-w-xs">{desc}</p>
</a>
