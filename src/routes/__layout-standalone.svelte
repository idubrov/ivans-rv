<script context="module">
	export { default as img } from '$lib/components/MarkdownImg.svelte';
	export { default as a } from '$lib/components/MarkdownLink.svelte';
</script>

<script>
	import Gallery from "$lib/components/Gallery.svelte";
	import {writable} from "svelte/store";
	import {galleryKey, assetsKey} from "$lib/types";
	import {getContext, setContext} from "svelte";

	export let title;
	export let format;

	const opener = writable({
		openAsset() {
			return false;
		}
	});
	setContext(galleryKey, opener);
	const assets = getContext(assetsKey) ?? {};
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
		<Gallery assets={assets} bind:opener={$opener} />
	</article>
{/if}
