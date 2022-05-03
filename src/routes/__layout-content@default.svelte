<script context="module">
    export { default as img } from "$lib/components/AssetImg.svelte";
    export { default as a } from "$lib/components/AssetLink.svelte";
</script>
<script>
    export let title;
</script>
<svelte:head>
    <title>{title}</title>
</svelte:head>
<slot/>