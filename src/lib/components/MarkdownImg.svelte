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

	const origAsset = resolveAsset(src);
	const asset = prepareAsset(origAsset ?? { url: src });
	const galleryStore: Readable<GalleryOpener> = getContext(galleryKey);
	function openGallery() {
		get(galleryStore).openAsset(asset);
	}
	const galleryImage = origAsset && galleryStore;
</script>

{#if galleryImage}
	<a href={asset.url} on:click|preventDefault={openGallery}>
		<img src={asset.url} alt={alt ?? asset.alt} style="{asset.style} {style}" />
	</a>
{:else}
	<img src={asset.url} alt={alt ?? asset.alt} style="{asset.style} {style}" />
{/if}
