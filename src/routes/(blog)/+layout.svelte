<script context="module">
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
	import dayjs from 'dayjs';
	import { postLink } from '$lib/navigation';

	/** @type {string} */
	export let title;
	/** @type {string} */
	export let format;
	/** @type {string} */
	export let date;
	/** @type {number} */
	export let time;
	/** @type {string} */
	export let key;
	/** @type {import("$lib/types").PostMetadata} */
	export let previous;
	/** @type {import("$lib/types").PostMetadata} */
	export let next;
	/** @type {string} */
	export let summary;
	/** @type {Record<string, import("$lib/types").Asset>} */
	export let assets;
	/** @type {string} */
	export let slug;

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
		<link
			rel="canonical"
			href={new URL(postLink({ date: dayjs.utc(date).toDate(), slug }), baseUrl()).toString()}
		/>
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
