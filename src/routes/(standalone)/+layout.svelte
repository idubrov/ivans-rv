<script context="module">
	export { default as img } from '$lib/components/MarkdownImg.svelte';
	export { default as a } from '$lib/components/MarkdownLink.svelte';
</script>

<script>
	import Gallery from '$lib/components/Gallery.svelte';
	import { writable } from 'svelte/store';
	import { galleryKey, assetsKey } from '$lib/types';
	import { setContext } from 'svelte';

	/** @type {string} */
	export let title;
	/** @type {string} */
	export let format;
	/** @type {Record<string, import("$lib/types").Asset>} */
	export let assets;

	const opener = writable({
		openAsset() {
			return false;
		}
	});
	setContext(galleryKey, opener);
	setContext(assetsKey, assets);
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
		<section class="content">
			<slot />
		</section>
	</article>
{/if}
