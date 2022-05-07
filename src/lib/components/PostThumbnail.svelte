<script lang="ts">
	import type { PostMetadata } from '$lib/types';
	import SmartImg from './SmartImg.svelte';
	export let post: PostMetadata;
	export let width = 720;
	export let height = 540;

	$: sorted = [...Object.keys(post.assets)].sort();
	$: asset = post.assets[sorted[0]];
	$: url = `${asset.url}?nf_resize=smartcrop&w=${width}&h=${height}`;
	$: alt = asset.alt;
</script>

{#if asset}
	<SmartImg src={url} {alt} />
{/if}
