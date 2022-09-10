import { getPostsByTag } from '$lib/blog';
import PostsList from '$lib/components/PostsList.svelte';
import type { PostMetadata } from '$lib/types';
import type { PageLoad } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const posts = await getPostsByTag(params.tag);
	return {
		posts: [...posts].reverse()
	};
};
