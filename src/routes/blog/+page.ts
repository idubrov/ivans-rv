import { getAllPosts } from '$lib/blog';
import type { PostMetadata } from '$lib/types';

export const load = async (): Promise<{ posts: PostMetadata[] }> => {
	const posts = await getAllPosts();
	return {
		posts: [...posts].reverse()
	};
};
