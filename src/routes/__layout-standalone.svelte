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
		<title>{title}</title>
	{/if}
</svelte:head>

{#if format === 'summary'}
	<slot />
{:else}
	<article class="markdown">
		<h1>
			{title}
		</h1>
		<section>
			<slot />
		</section>
	</article>
{/if}
