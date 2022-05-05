<script lang="ts">
	import type { Asset, PostMetadata } from '$lib/types';
	import AssetImg from './AssetImg.svelte';
	export let post: PostMetadata;
	const sorted = [...Object.keys(post.assets)].sort();
	const asset: Asset = post.assets[sorted[0]];
	export let width = 480;
	export let height = 360;
</script>

{#if asset}
	<AssetImg {asset} query="?nf_resize=smartcrop&w={width}&h={height}" />
{/if}
