<!-- <a> component for Markdown generation: tries to resolve the link against page "assets" -->
<script lang="ts">
	import { resolveAsset } from '$lib/assets';
	import { resolveRelativeLink } from '$lib/navigation';

	export let href: string;
	export let rel: string | undefined = undefined;

	const { asset, query } = resolveAsset(href);

	// This image is a local asset, relative to the content. Replace source with an actual URL from the assets map.
	if (asset) {
		href = asset.url + query;
	} else {
		href = resolveRelativeLink(href);
	}
</script>

<a {href} {rel}>
	<slot />
</a>
