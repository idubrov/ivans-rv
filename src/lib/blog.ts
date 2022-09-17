import type { Category, CategoryInfo, CurrentPost, Post, PostMetadata } from './types';
import { dev } from '$app/environment';
import { browser } from '$app/environment';
import { resolveCreatePost } from './blogClient';

if (browser) {
	throw new Error('This module can only be used on a server!');
}

type Resolver = () => Promise<Record<string, any>>;

async function listPostsInternal(): Promise<readonly Post[]> {
	const modules: Record<string, Resolver> = import.meta.glob('./content/*/index.md');
	const entries = (
		await Promise.all(Object.keys(modules).map((path) => resolveCreatePost(path, modules[path])))
	).filter((item): item is Post => typeof item !== 'undefined');

	// Sort from oldest to newest
	entries.sort((a, b) => a.date.getTime() - b.date.getTime());
	return Object.freeze(entries);
}

export const ENTRIES2 = listPostsInternal();

/**
 * Get all posts ordered from the earliest to the latest.
 */
export async function getAllPostsMetadata(): Promise<readonly PostMetadata[]> {
	return (await ENTRIES2).map(({ component, ...post }) => post);
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
		code: 'wings',
		description: 'Wings'
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
