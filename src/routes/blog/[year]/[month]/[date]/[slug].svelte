<script context="module" lang="ts">
	import { getPostAndSiblings } from '$lib/blog';

	export const load = async ({ params }) => {
		const postKey = `${params.year}-${params.month}-${params.date}-${params.slug}`;
		const postAndSiblings = await getPostAndSiblings(postKey);
		if (typeof postAndSiblings === 'undefined') {
			return {
				status: 404
			};
		}
		const { previous, current, next } = postAndSiblings;
		return {
			props: {
				previous,
				current,
				next
			}
		};
	};
</script>

<script lang="ts">
	import NavLinks from '$lib/components/NavLinks.svelte';
	import Gallery from '$lib/components/Gallery.svelte';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { galleryKey } from '$lib/types';
	import type { GalleryOpener, PostMetadata } from '$lib/types';

	export let previous: PostMetadata;
	export let current: PostMetadata;
	export let next: PostMetadata;

	const opener = writable<GalleryOpener>({
		openAsset() {
			// nothing
		}
	});
	setContext(galleryKey, opener);
</script>

<svelte:component this={current.component} />
<Gallery assets={current.assets} bind:opener={$opener} />
<NavLinks {previous} {next} />
