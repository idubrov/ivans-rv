import { error } from '@sveltejs/kit';
import { getPostAndSiblings } from '$lib/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const postKey = `${params.year}-${params.month}-${params.date}-${params.slug}`;
	const postAndSiblings = await getPostAndSiblings(postKey);
	if (typeof postAndSiblings === 'undefined') {
		throw error(404);
	}
	const { previous, current, next } = postAndSiblings;
	return {
		previous,
		current,
		next
	};
};
