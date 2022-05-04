<script lang="ts">
	import type { PostMetadata } from '$lib/types';
	import { postLink } from '$lib/navigation';

	export let previous: PostMetadata;
	export let next: PostMetadata;
</script>

{#if previous}<a href={postLink(previous)}>Earlier</a>{/if}
{#if next}<a href={postLink(next)}>Later</a>{/if}
