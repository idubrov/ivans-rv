import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { aggregateCategories, aggregateTags } from '$lib/blog';
import { getAllPosts } from '$lib/blog';

dayjs.extend(utc);

export const load = async ({ fetch }) => {
	const categories = await aggregateCategories();
	const tags = await aggregateTags();
	const posts = await getAllPosts();
	const indexResponse = await fetch('/search.json');
	const searchIndex = await indexResponse.json();
	return {
		categories,
		tags,
		recent: [...posts].reverse().slice(0, 5),
		searchIndex
	};
};
