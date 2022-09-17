import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import type { LayoutLoad } from './$types';

dayjs.extend(utc);

export const load: LayoutLoad = async ({ data, fetch }) => {
	const indexResponse = await fetch('/search.json');
	const searchIndex = await indexResponse.json();
	return {
		...data,
		searchIndex
	};
};

export const prerender = true;
