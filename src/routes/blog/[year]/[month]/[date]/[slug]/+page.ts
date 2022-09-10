import { error } from '@sveltejs/kit';
import { getPostAndSiblings } from '$lib/blog';
import type { PostMetadata } from '$lib/types';

type PageData = {
	previous?: PostMetadata;
	current?: PostMetadata;
	next?: PostMetadata;
}

export const load = async ({ params }): Promise<PageData> => {
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
