<script context="module" lang="ts">
	import 'lightgallery/css/lightgallery.css';
	import 'lightgallery/css/lg-thumbnail.css';
	import lightGallery from 'lightgallery/lightgallery.es5';
	import lgThumbnail from 'lightgallery/plugins/thumbnail/lg-thumbnail.es5';
</script>

<script lang="ts">
	import type { Assets, Asset } from '$lib/types';
	import { prepareAsset } from '$lib/assets';
	import { onMount } from 'svelte';

	export let assets: Assets = {};

	const orderedAssets = [...Object.keys(assets)]
		.sort()
		.map((name) => assets[name])
		.map((asset) => prepareAsset(asset, '?nf_resize=smartcrop&w=90&h=90'));

	export let opener;
	let element: any;
	onMount(() => {
		const gallery = lightGallery(element, {
			plugins: [lgThumbnail],
			speed: 500,
			zoomFromOrigin: false
			//licenseKey: 'your_license_key'
		});
		opener = {
			openAsset(asset: Asset) {
				const item = gallery.galleryItems.findIndex((el: number) => el.downloadUrl === asset.url);
				if (item !== -1) {
					gallery.openGallery(item);
				}
			}
		};
	});
</script>

<section bind:this={element}>
	{#each orderedAssets as asset, index}
		<a href="{asset.url}?nf_resize=fit&w=1008&h=1008" target="_blank" data-download-url={asset.url}>
			<img src="{asset.url}" alt={asset.alt} style={asset.style} />
		</a>
	{/each}
</section>
