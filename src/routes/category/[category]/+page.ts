import { getPostsByCategory } from '$lib/blog';
import type { PostMetadata } from "$lib/types";

export const load = async ({ params }): Promise<{ posts: PostMetadata[] }> => {
	const posts = await getPostsByCategory(params.category);
	return {
		posts: [...posts].reverse()
	};
};
