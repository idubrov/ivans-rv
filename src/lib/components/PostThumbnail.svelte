<script lang="ts">
	import type { Asset, PostMetadata } from '$lib/types';
	import { prepareAsset } from '$lib/assets';
	export let post: PostMetadata;
	export let width = 720;
	export let height = 540;

	function selectThumbnail(): Asset{
		const assetKey = post.thumbnail ?? [...Object.keys(post.assets)].sort()[0];
		const asset = post.assets[assetKey];
		if (!asset) {
			throw new Error(`Thumbnail not found for post '${post.key}'!`);
		}
		const url = asset && `${asset.url}?nf_resize=smartcrop&w=${width}&h=${height}`;
		return { url, ...asset };
	}
	$: thumbnail = selectThumbnail();

	$: asset = prepareAsset(thumbnail);
</script>

{#if thumbnail.url}
	<img class="thumbnail" src={asset.url} alt={asset.meta.alt} style={asset.style} />
{/if}
