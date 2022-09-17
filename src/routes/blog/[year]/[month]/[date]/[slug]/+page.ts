import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { hydratePost } from '$lib/blogClient';

export const load: PageLoad = async ({ data }) => {
	if (typeof data.current === 'undefined') {
		throw error(404);
	}
	const currentComponent = (await hydratePost(data.current)).component;
	return {
		...data,
		currentComponent
	};
};
