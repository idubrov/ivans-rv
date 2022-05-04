<script lang="ts">
    import type {Asset, PostMetadata} from '$lib/types';
    import AssetImg from "./AssetImg.svelte";
	export let post: PostMetadata;
    const sorted = [...Object.keys(post.assets)].sort();
    const asset: Asset = post.assets[sorted[0]];
</script>
<AssetImg asset={asset} query="?nf_resize=smartcrop&w=45&h=45" />
