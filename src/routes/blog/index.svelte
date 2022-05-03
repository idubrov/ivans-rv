<script context="module" lang="ts">
	import { getAllPosts } from '$lib/blog';
	import PostsList from '$lib/components/PostsList.svelte';
	import type { PostMetadata } from '$lib/types';

	export const load = async () => {
		const posts = await getAllPosts();
		return {
			props: {
				posts
			}
		};
	};
</script>

<script lang="ts">
	export let posts: PostMetadata[];
</script>

<PostsList {posts} />
