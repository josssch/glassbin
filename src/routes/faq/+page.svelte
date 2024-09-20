<script>
    import ExplainerSection from '$lib/components/layout/ExplainerSection.svelte'
    import VerticalFullscreen from '$lib/components/layout/VerticalFullscreen.svelte'
</script>

<VerticalFullscreen class="gap-16 items-center *:w-full">
    <ExplainerSection id="who" title="Who?">
        This website is owned and maintained by
        <a href="https://nicely.gg">nicely</a>.
    </ExplainerSection>

    <ExplainerSection id="what" title="What?">
        Glassbin is designed to be a flexible and easy-to-use snippet sharing
        tool. All others fail to provide a snappy interface, proper UIs, or are
        ugly. The goal of Glassbin was to attempt to make something that meets
        the both of these standards.
    </ExplainerSection>

    <ExplainerSection id="why" title="Why?">
        Ever since Hastebin was purchased and replaced with the abomination it
        is now, it has felt as though there is a gap in the snippet sharing
        space. The hope with Glassbin is to maybe mend this by providing a very
        accessible UI paired with a surprisingly usable built-in syntax
        highlighter.
    </ExplainerSection>
</VerticalFullscreen>

<style>
    :global(html, body) {
        scroll-behavior: smooth;
    }

    a {
        text-underline-offset: theme('textUnderlineOffset.4');
        text-decoration: underline;
    }
</style>
