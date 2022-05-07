<!-- Smart image component: in case of local images, uses CSS to resize them when running in dev -->
<script lang="ts">
	import { prepareAsset } from '$lib/assets';

	export let src: string;
	export let alt: string | undefined = undefined;
	export let style = '';

	const asset = prepareAsset({
		url: src,
		alt
	});
	const effectiveStyle =
		asset.style || style ? (asset.style ? `${asset.style} ${style}` : style) : '';
</script>

<img src={asset.url} alt={asset.alt} style={effectiveStyle} />
