<!-- Smart image component: in case of local images, uses CSS to resize them when running in dev -->
<script lang="ts">
	import { prepareAsset } from '$lib/assets';

	let clazz;
	export { clazz as class };
	export let src: string;
	export let alt: string | undefined = undefined;
	export let style = '';

	$: asset = prepareAsset({
		url: src,
		alt
	});
	$: effectiveStyle = `${asset.style ?? ''} ${style ?? ''}`.trim();
</script>

<img class={clazz} src={asset.url} alt={asset.alt} style={effectiveStyle} />
