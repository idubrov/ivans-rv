<script context="module">
	export { default as img } from '$lib/components/MarkdownImg.svelte';
	export { default as a } from '$lib/components/MarkdownLink.svelte';
</script>

<script>
	export let title;
</script>

<svelte:head>
	<title>{title} -- Ivan's RV-7</title>
	<!-- FIXME: og metadata -->
</svelte:head>
<article class="markdown">
	<slot />
</article>
