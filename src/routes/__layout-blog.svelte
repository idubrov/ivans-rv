<script context="module">
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc.js';

	dayjs.extend(utc);

	export { default as img } from '$lib/components/MarkdownImg.svelte';
	export { default as a } from '$lib/components/MarkdownLink.svelte';
</script>

<script>
	import TimeSpent from '$lib/components/TimeSpent.svelte';
	import Gallery from '$lib/components/Gallery.svelte';
	import NavLinks from '$lib/components/NavLinks.svelte';
	import { writable } from 'svelte/store';
	import { galleryKey, assetsKey } from '$lib/types';
	import { setContext } from 'svelte';
	import { baseUrl } from '$lib/assets';

	export let title;
	export let format;
	export let date;
	export let time;
	export let key;
	export let previous;
	export let next;
	export let summary;
	export let assets;

	const opener = writable({
		openAsset() {
			return false;
		}
	});
	setContext(galleryKey, opener);
	setContext(assetsKey, assets);

	$: sorted = [...Object.keys(assets)].sort();
	$: thumbnail = assets[sorted[0]];
	$: image = thumbnail && new URL(thumbnail.url, baseUrl());
</script>

<svelte:head>
	{#if format !== 'summary'}
		<title>{title}</title>
		<meta data-key="description" name="description" content={summary} />
		<meta property="og:type" content="article" />
		<meta property="og:title" content={title} />
		<meta property="og:description" content={summary} />
		{#if thumbnail}
			<meta property="og:image" content="{image}?nf_resize=smartcrop&w=1440&h=1080" />
			<meta property="og:image:width" content="1440" />
			<meta property="og:image:height" content="1080" />
		{/if}
	{/if}
</svelte:head>

{#if format === 'summary' || format === 'rss'}
	<slot />
{:else}
	<article id={key} class="markdown">
		<h1>
			{title}<TimeSpent {time} />
		</h1>
		<h2>{dayjs.utc(date).format('MMMM D, YYYY')}</h2>
		<section class="content">
			<slot />
		</section>
		<Gallery {assets} bind:opener={$opener} />
		<NavLinks {previous} {next} />
	</article>
{/if}
