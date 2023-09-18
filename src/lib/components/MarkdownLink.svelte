<!-- <a> component for Markdown generation: tries to resolve the link against page "assets" -->
<script lang="ts">
	import type { Readable } from 'svelte/store';
	import type { GalleryOpener, Asset } from '$lib/types';
	import { resolveAsset } from '$lib/assets';
	import { resolveCrossLink } from '$lib/navigation';
	import { get } from 'svelte/store';
	import { galleryKey } from '$lib/types';
	import { getContext } from 'svelte';

	export let href: string;
	export let rel: string | undefined = 'noreferrer';
	export let target: string | undefined = undefined;

	let asset: Asset | undefined;
	$: {
		asset = resolveAsset(href);
		if (asset) {
			// This image is a local asset, relative to the content. Replace source with an actual URL from the assets map.
			// FIXME: we also default in MarkdownLink
			href = `${asset.url}?nf_resize=fit&w=720&h=540`;
		} else {
			const crossLink = resolveCrossLink(href);
			if (crossLink) {
				href = crossLink;
			} else {
				target = target ?? '_blank';
			}
		}
	}

	let galleryStore: Readable<GalleryOpener>;
	$: galleryStore = getContext(galleryKey);
	function openGallery(e: Event) {
		if (asset && get(galleryStore).openAsset(asset)) {
			e.preventDefault();
		}
	}
</script>

{#if asset && galleryStore}
	<a {href} {rel} on:click={openGallery} target="_blank">
		<slot />
	</a>
{:else}
	<a {href} {rel} {target}>
		<slot />
	</a>
{/if}
