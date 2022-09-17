import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { loadPostAsComponent } from '$lib/blogClient';

export const load: PageLoad = async ({ data }) => {
	if (typeof data.current === 'undefined') {
		throw error(404);
	}
	const component = await loadPostAsComponent(data.current);
	return {
		...data,
		component
	};
};
