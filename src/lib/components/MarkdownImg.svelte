<!-- <img> component for Markdown generation: tries to resolve the image link against page "assets" -->
<script lang="ts">
	import type { Readable } from 'svelte/store';
	import type { GalleryOpener } from '$lib/types';
	import { resolveAsset, prepareAsset } from '$lib/assets';
	import { getContext } from 'svelte';
	import { get } from 'svelte/store';
	import { galleryKey } from '$lib/types';

	export let src: string;
	export let style: string | undefined = undefined;
	export let alt: string | undefined = undefined;

	$: origAsset = resolveAsset(src);
	$: asset = prepareAsset(origAsset ?? { url: src }, '?nf_resize=fit&w=480&h=480');

	let galleryStore: Readable<GalleryOpener>;
	$: galleryStore = getContext(galleryKey);
	function openGallery(e) {
		if (get(galleryStore).openAsset(asset)) {
			e.preventDefault();
		}
	}
	$: effectiveStyle = asset.style || style ? (asset.style ? `${asset.style} ${style}` : style) : '';
</script>

{#if origAsset && galleryStore}
	<a href={asset.url} on:click={openGallery}>
		<img src={asset.url} alt={alt ?? asset.alt} style={effectiveStyle} />
	</a>
{:else}
	<img src={asset.url} alt={alt ?? asset.alt} style={effectiveStyle} />
{/if}
