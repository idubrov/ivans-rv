import type { Category, CategoryInfo } from '$lib/types';
import { getAllPosts } from './blog';

export const CATEGORIES: Category[] = [
	{
		code: 'empennage',
		description: 'Empennage'
	},
	{
		code: 'empennage-horizontal-stabilizer',
		description: 'Horizontal stabilizer'
	},
	{
		code: 'empennage-elevator',
		description: 'Elevator'
	},
	{
		code: 'empennage-vertical-stabilizer',
		description: 'Vertical stabilizer'
	},
	{
		code: 'empennage-rudder',
		description: 'Rudder'
	},
	{
		code: 'practice-kit',
		description: 'Practice Kit'
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
