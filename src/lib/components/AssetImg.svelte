<!-- Show page asset as an image -->
<script lang="ts">
	import type { Asset } from '$lib/types';
	import SmartImg from './SmartImg.svelte';

	export let asset: Asset;
	export let query = '';
    export let style = '';
	const src = `${asset.url}${query}`;
</script>

<SmartImg {src} alt={asset.alt} {style} />
