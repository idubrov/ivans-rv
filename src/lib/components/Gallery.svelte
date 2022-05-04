<script context="module" lang="ts">
	import 'lightgallery/css/lightgallery.css';
	import 'lightgallery/css/lg-thumbnail.css';
	import lightGallery from 'lightgallery/lightgallery.es5';
	import lgThumbnail from 'lightgallery/plugins/thumbnail/lg-thumbnail.es5';
</script>

<script lang="ts">
	import type { Assets } from '$lib/types';
	import { simulateNetlifyTransform } from '$lib/assets';
	import { onMount } from 'svelte';

	export let assets: Assets = {};

	const orderedAssets = [...Object.keys(assets)]
		.sort()
		.map((name) => assets[name])
		.map((asset) => ({
			...asset,
			query: '?nf_resize=smartcrop&w=90&h=90'
		}));

	export let gallery;
	onMount(() => {
		lightGallery(gallery, {
			plugins: [lgThumbnail],
			speed: 500,
			zoomFromOrigin: false
			//licenseKey: 'your_license_key'
		});
	});
</script>

<section bind:this={gallery}>
	{#each orderedAssets as asset, index}
		<a href="{asset.url}?nf_resize=fit&w=1008&h=1008" target="_blank" data-download-url={asset.url}>
			<img
				src="{asset.url}{asset.query}"
				alt={asset.alt}
				style={simulateNetlifyTransform(asset.query)}
			/>
		</a>
	{/each}
</section>
