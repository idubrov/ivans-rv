import { error } from '@sveltejs/kit';
import { getPostAndSiblings } from '$lib/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const postAndSiblings = await getPostAndSiblings({
		year: parseInt(params.year, 10),
		month: parseInt(params.month, 10),
		date: parseInt(params.date, 10),
		slug: params.slug
	});
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
