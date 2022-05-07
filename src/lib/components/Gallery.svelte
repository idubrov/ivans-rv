<script context="module" lang="ts">
	import 'lightgallery/css/lightgallery.css';
	import 'lightgallery/css/lg-thumbnail.css';
	import lightGallery from 'lightgallery';
	import lgThumbnail from '../../../node_modules/lightgallery/plugins/thumbnail';
</script>

<script lang="ts">
	import type { Assets, Asset, PreparedAsset } from '$lib/types';
	import { prepareAsset } from '$lib/assets';
	import { afterUpdate } from 'svelte';

	export let assets: Assets = {};

	$: orderedAssets = [...Object.keys(assets)]
		.sort()
		.map((name) => assets[name])
		.map((asset) => ({
			...prepareAsset(asset, '?nf_resize=smartcrop&w=90&h=90'),
			downloadUrl: asset.url
		}));

	export let opener;
	let element: any;
	afterUpdate(() => {
		const gallery = lightGallery(element, {
			plugins: [lgThumbnail],
			speed: 500,
			zoomFromOrigin: false
			//licenseKey: 'your_license_key'
		});
		opener = {
			openAsset(asset: Asset) {
				const pos = asset.url.indexOf('?');
				const assetUrl = pos !== -1 ? asset.url.slice(0, pos) : asset.url;
				const item = gallery.galleryItems.findIndex((el) => el.downloadUrl === assetUrl);
				if (item !== -1) {
					gallery.openGallery(item);
					return true;
				} else {
					const items = gallery.galleryItems.map((el) => el.downloadUrl).join(', ');
					console.warn(`Did not find asset '${assetUrl}', looked through [${items}]`);
					return false;
				}
			}
		};
	});
</script>

{#if orderedAssets.length > 0}
	<section bind:this={element} class="gallery">
		{#each orderedAssets as asset, index}
			<a
				href="{asset.downloadUrl}?nf_resize=fit&w=1008&h=1008"
				target="_blank"
				data-download-url={asset.downloadUrl}
			>
				<img src={asset.url} alt={asset.alt} style={asset.style} />
			</a>
		{/each}
	</section>
{/if}
