<script lang="ts">
	import PostsList from '$lib/components/PostsList.svelte';
	import type { PageLoad } from './$types';

	export let data: PageLoad;
</script>

<PostsList posts={data.posts} />
