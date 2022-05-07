import type { Category, CategoryInfo } from '$lib/types';
import { getAllPosts } from './blog';

export const CATEGORIES: Category[] = [
	{
		code: 'empennage',
		description: 'Empennage'
	},
	{
		code: 'practice-kit',
		description: 'Practice Kit'
	},
	{
		code: 'side-project',
		description: 'Side Projects'
	}
];

export async function aggregateCategories(): Promise<CategoryInfo[]> {
	const posts = await getAllPosts();
	return (
		CATEGORIES.map((template) => {
			const categoryPosts = posts.filter((entry) => entry.categories.includes(template.code));
			return {
				...template,
				totalTime: categoryPosts.map((post) => post.time).reduce((a, b) => a + b, 0),
				totalLogs: categoryPosts.length
			};
		})
			// Skip empty categories
			.filter((category) => category.totalLogs > 0)
	);
}
