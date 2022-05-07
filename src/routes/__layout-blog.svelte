<script context="module">
	import dayjs from 'dayjs';

	export { default as img } from '$lib/components/MarkdownImg.svelte';
	export { default as a } from '$lib/components/MarkdownLink.svelte';
</script>

<script>
	import TimeSpent from '$lib/components/TimeSpent.svelte';
	import Gallery from '$lib/components/Gallery.svelte';
	import NavLinks from "$lib/components/NavLinks.svelte";
	import {writable} from "svelte/store";
	import {galleryKey, assetsKey} from "$lib/types";
	import {getContext, setContext} from "svelte";

	export let title;
	export let format;
	export let date;
	export let time;
	export let key;
	export let previous;
	export let next;

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
	<article id={key} class="markdown">
		<h1>
			{title}<sup><TimeSpent {time} /></sup>
		</h1>
		<h2>{dayjs.utc(date).format('MMMM D, YYYY')}</h2>
		<section>
			<slot />
		</section>
		<Gallery assets={assets} bind:opener={$opener} />
		<NavLinks {previous} {next} />
	</article>
{/if}
