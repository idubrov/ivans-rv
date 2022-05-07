<script context="module" lang="ts">
	import { getPostsByTag } from '$lib/blog';
	import PostsList from '$lib/components/PostsList.svelte';
	import type { PostMetadata } from '$lib/types';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params }) => {
		const posts = await getPostsByTag(params.tag);
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

<PostsList {posts} />
