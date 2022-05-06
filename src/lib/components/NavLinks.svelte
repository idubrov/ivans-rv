<script lang="ts">
	import type { PostMetadata } from '$lib/types';
	import { postLink } from '$lib/navigation';

	export let previous: PostMetadata;
	export let next: PostMetadata;
</script>

<section id = 'Paging'>
	{#if previous}<a href={postLink(previous)}>&larr; Earlier</a>{/if}
	{#if next}<a href={postLink(next)}>Later &rarr;</a>{/if}
</section>