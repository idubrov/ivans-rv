<script lang="ts">
	import type { PostMetadata } from '$lib/types';
	import SmartImg from './SmartImg.svelte';
	export let post: PostMetadata;
	export let width = 720;
	export let height = 540;

	function selectThumbnail(): { url?: string; alt?: string } {
		const assetKey = post.thumbnail ?? [...Object.keys(post.assets)].sort()[0];
		const asset = post.assets[assetKey];
		const url = asset && `${asset.url}?nf_resize=smartcrop&w=${width}&h=${height}`;
		const alt = asset && asset.alt;
		return { url, alt };
	}
	$: thumbnail = selectThumbnail();
</script>

{#if thumbnail.url}
	<SmartImg class="thumbnail" src={thumbnail.url} alt={thumbnail.alt} />
{/if}
