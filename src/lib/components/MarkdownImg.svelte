<!-- <img> component for Markdown generation: tries to resolve the image link against page "assets" -->
<script lang="ts">
	import type { Readable } from 'svelte/store';
	import type { Asset, GalleryOpener } from '$lib/types';
	import { resolveAsset, prepareAsset } from '$lib/assets';
	import { getContext } from 'svelte';
	import { get } from 'svelte/store';
	import { galleryKey } from '$lib/types';

	export let src: string;
	export let style: string | undefined = undefined;
	export let alt: string | undefined = undefined;

	$: origAsset = resolveAsset(src);
	let asset: Pick<Partial<Asset>, "meta"> & Omit<Asset, "meta">;
	$: asset = origAsset
		? prepareAsset(origAsset, '?nf_resize=fit&w=720&h=540')
		: { url: src };

	let galleryStore: Readable<GalleryOpener>;
	$: galleryStore = getContext(galleryKey);
	function openGallery() {
		get(galleryStore).openAsset(asset);
	}
</script>

{#if origAsset && galleryStore}
	<a href={asset.url} on:click|preventDefault={openGallery} target="_blank" rel="noreferrer">
		<img src={asset.url} alt={alt ?? asset.meta?.alt} style={style} />
	</a>
{:else}
	<img src={asset.url} alt={alt ?? asset.meta?.alt} style={style} />
{/if}
