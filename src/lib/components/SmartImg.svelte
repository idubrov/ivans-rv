<!-- Smart image component: in case of local images, uses CSS to resize them when running in dev -->
<script lang="ts">
    import {isNetlify, simulateNetlifyTransform} from '$lib/assets';

    export let src: string;
    export let alt: string | undefined = undefined;

    const isLocal = !src.startsWith("http://") && !src.startsWith("https://");
    const pos = src.indexOf('?');
    const query = pos !== -1 ? src.slice(pos) : "";

    let style: string | undefined = undefined;
    if (query && !isNetlify() && isLocal) {
        // While developing, simulate Netlify image transformations for local images (https://docs.netlify.com/large-media/transform-images/)
        style = simulateNetlifyTransform(query);
    }
</script>

<img src={src} alt={alt} style={style} />