<!-- <a> component for Markdown generation: tries to resolve the link against page "assets" -->
<script lang="ts">
	import type { Readable } from 'svelte/store';
	import type { GalleryOpener } from '$lib/types';
	import { resolveAsset } from '$lib/assets';
	import { resolveCrossLink } from '$lib/navigation';
	import { get } from 'svelte/store';
	import { galleryKey } from '$lib/types';
	import { getContext } from 'svelte';

	export let href: string;
	export let rel: string | undefined = undefined;
	export let target: string | undefined = undefined;

	const asset = resolveAsset(href);

	// This image is a local asset, relative to the content. Replace source with an actual URL from the assets map.
	if (asset) {
		href = asset.url;
	} else {
		const crossLink = resolveCrossLink(href);
		if (crossLink) {
			href = crossLink;
		} else {
			target = target ?? "_blank";
		}
	}

	const galleryStore: Readable<GalleryOpener> = getContext(galleryKey);

	function openGallery() {
		if (asset) {
			get(galleryStore).openAsset(asset);
		}
	}
	const galleryImage = asset && galleryStore;
</script>

{#if galleryImage}
	<a {href} {rel} on:click|preventDefault={openGallery}>
		<slot />
	</a>
{:else}
	<a {href} {rel} {target}>
		<slot />
	</a>
{/if}
