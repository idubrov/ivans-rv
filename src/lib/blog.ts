import type { Category, CategoryInfo, CurrentPost, PostMetadata } from './types';
import { browser } from '$app/environment';
import { loadPosts } from './blogClient';

if (browser) {
	throw new Error('This module can only be used on a server!');
}

export const ENTRIES = loadPosts();

/**
 * Get all posts ordered from the earliest to the latest.
 */
export async function getAllPostsMetadata(): Promise<readonly PostMetadata[]> {
	return await ENTRIES;
}

export async function getPostsByCategory(category: string): Promise<PostMetadata[]> {
	return (await getAllPostsMetadata()).filter((entry) => entry.categories.includes(category));
}

export async function getPostsByTag(tag: string): Promise<PostMetadata[]> {
	return (await getAllPostsMetadata()).filter((entry) => entry.tags.includes(tag));
}

export async function getPostAndSiblings(key: string): Promise<CurrentPost | undefined> {
	const posts = await getAllPostsMetadata();
	const pos = posts.findIndex((post) => post.key === key);
	if (pos === -1) {
		return undefined;
	}
	return {
		previous: pos > 0 ? posts[pos - 1] : undefined,
		current: posts[pos],
		next: pos < posts.length - 1 ? posts[pos + 1] : undefined
	};
}

export const CATEGORIES: Category[] = [
	{
		code: 'empennage',
		description: 'Empennage'
	},
	{
		code: 'fuselage',
		description: 'Fuselage'
	},
	{
		code: 'wing',
		description: 'Wings'
	},
	{
		code: 'practice-kit',
		description: 'Practice Kit'
	},
	{
		code: 'side-project',
		description: 'Side Projects'
	},
	{
		code: 'engine',
		description: 'Engine'
	},
	{
		code: 'avionics',
		description: 'Avionics'
	}
];

export async function aggregateCategories(): Promise<CategoryInfo[]> {
	const posts = await getAllPostsMetadata();
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

export async function aggregateTags(): Promise<string[]> {
	const posts = await getAllPostsMetadata();
	return [...new Set(posts.flatMap((post) => post.tags))].sort();
}
