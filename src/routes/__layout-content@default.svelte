<script context="module">
    export { default as img } from "$lib/components/MarkdownImg.svelte";
    export { default as a } from "$lib/components/MarkdownLink.svelte";
</script>
<script>
    export let title;
    export let time = undefined;
    export let tags = undefined;
    export let categories = undefined;
    export let format = undefined;
</script>
<svelte:head>
    <title>{title} -- Ivan's RV-7</title>
    <!-- FIXME: og metadata -->
</svelte:head>
<article class="markdown">
    <slot/>
</article>