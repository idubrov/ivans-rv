<script context="module" lang="ts">
	import { getPostAndSiblings } from '$lib/blog';

	export const load = async ({ params }) => {
		const postKey = `${params.year}-${params.month}-${params.date}-${params.slug}`;
		const { previous, current, next } = await getPostAndSiblings(postKey);
		return {
			props: {
				previous,
				current,
				next
			}
		};
	};
</script>

<script>
	import NavLinks from '$lib/components/NavLinks.svelte';
	import Gallery from '$lib/components/Gallery.svelte';

	export let previous;
	export let current;
	export let next;
</script>

<svelte:component this={current.component} />
<Gallery assets={current.assets} />
<NavLinks {previous} {next} />
