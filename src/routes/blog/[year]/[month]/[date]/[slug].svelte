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
	import type { PostMetadata } from '$lib/types';

	export let previous: PostMetadata;
	export let current: PostMetadata;
	export let next: PostMetadata;

	const { component, ...metadata } = current;
</script>

<svelte:component this={current.component} {...metadata} {previous} {next} />
