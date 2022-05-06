<script context="module">
	export { default as img } from '$lib/components/MarkdownImg.svelte';
	export { default as a } from '$lib/components/MarkdownLink.svelte';
</script>

<script>
	export let title;
	export let format;
</script>

<svelte:head>
	{#if format !== 'summary'}
		<!-- FIXME: og metadata -->
		<title>{title} -- Ivan's RV-7</title>
	{/if}
</svelte:head>

{#if format === 'summary'}
	<slot />
{:else}
	<!-- Full page specific stuff -->
	<slot />
{/if}
