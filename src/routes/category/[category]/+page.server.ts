import { getPostsByCategory } from '$lib/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const posts = await getPostsByCategory(params.category);
	return {
		posts: [...posts].reverse()
	};
};
