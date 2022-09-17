import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { aggregateCategories, aggregateTags } from '$lib/blog';
import { getAllPostsMetadata } from '$lib/blog';
import type { LayoutServerLoad } from './$types';

dayjs.extend(utc);

export const load: LayoutServerLoad = async ({}) => {
	const categories = await aggregateCategories();
	const tags = await aggregateTags();
	const allPosts = await getAllPostsMetadata();
	const recent = [...allPosts].reverse().slice(0, 5);
	return {
		categories,
		tags,
		recent
	};
};
