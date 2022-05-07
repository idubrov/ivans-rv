<script lang="ts">
	import type { Asset, PostMetadata } from '$lib/types';
	import SmartImg from './SmartImg.svelte';
	export let post: PostMetadata;
	export let width = 480;
	export let height = 360;

	const sorted = [...Object.keys(post.assets)].sort();
	const asset: Asset = post.assets[sorted[0]];
	const url = `${asset.url}?nf_resize=smartcrop&w=${width}&h=${height}`;
	const alt = asset.alt;
</script>

{#if asset}
	<SmartImg src={url} {alt} />
{/if}
