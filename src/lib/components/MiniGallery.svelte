<script lang="ts">
	import type { Assets } from '$lib/types';
    import {simulateNetlifyTransform} from "$lib/assets";
	export let assets: Assets = {};
    export let show = 3;

    const orderedAssets = Object
        .keys(assets)
        .sort()
        .map(name => assets[name])
        .map(asset => ({
            ...asset,
            query: "?nf_resize=smartcrop&w=90&h=90",
        }))
        .slice(0, 1);
</script>
{#each orderedAssets as asset, index}
    <img src={asset.url}{asset.query} alt={asset.alt} style={simulateNetlifyTransform(asset.query)} />
{/each}