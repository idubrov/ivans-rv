import type { PageLoad } from './$types';
import { hydratePosts } from '$lib/blogClient';

export const load: PageLoad = async ({ data }) => {
	return {
		posts: await hydratePosts(data.posts)
	};
};
