import { getAllPostsMetadata } from '$lib/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const posts = await getAllPostsMetadata();
	return {
		posts: [...posts].reverse()
	};
};
