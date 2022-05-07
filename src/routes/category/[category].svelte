<script context="module" lang="ts">
	import { getPostsByCategory } from '$lib/blog';
	import PostsList from '$lib/components/PostsList.svelte';
	import type { PostMetadata } from '$lib/types';
	import type {Load} from "@sveltejs/kit";

	export const load: Load = async ({ params }) => {
		const posts = await getPostsByCategory(params.category);
		return {
			props: {
				posts: [...posts].reverse()
			}
		};
	};
</script>

<script lang="ts">
	export let posts: PostMetadata[];
</script>

<svelte:head>
	<title>Ivan's RV-7</title>
</svelte:head>

<PostsList {posts} />
