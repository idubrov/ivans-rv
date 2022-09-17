import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import type { LayoutLoad } from './$types';
import { hydratePost } from '$lib/blogClient';

dayjs.extend(utc);

export const load: LayoutLoad = async ({ data, fetch }) => {
	const indexResponse = await fetch('/search.json');
	const searchIndex = await indexResponse.json();
	return {
		categories: data.categories,
		tags: data.tags,
		recent: await Promise.all(data.recent.map(hydratePost)),
		searchIndex
	};
};

export const prerender = true;