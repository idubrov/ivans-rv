<!-- <img> component for Markdown generation: tries to resolve the image link against page "assets" -->
<script lang="ts">
    import {isNetlify, resolveAsset, simulateNetlifyTransform} from '$lib/assets';

    export let src: string;
    export let alt: string | undefined = undefined;

    const isLocal = !src.startsWith("http://") && !src.startsWith("https://");
    const { asset, query } = resolveAsset(src);

    // This image is a local asset, relative to the content. Replace source with an actual URL from the assets map.
    if (asset) {
        src = asset.url + query;
        alt = asset.alt;
    }

    let style: string | undefined = undefined;
    if (query && !isNetlify() && isLocal) {
        // While developing, simulate Netlify image transformations for local images (https://docs.netlify.com/large-media/transform-images/)
        style = simulateNetlifyTransform(query);
    }
</script>

<img src={src} alt={alt} style={style} />