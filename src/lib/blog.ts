import type { Category, CategoryInfo, CurrentPost, PostMetadata } from './types';
import { dev } from '$app/env';

async function createPost(
	path: string,
	resolver: () => Promise<Record<string, any>>
): Promise<PostMetadata | undefined> {
	const module = await resolver();
	if (!module.metadata.key) {
		console.warn(`Content entry path '${path}' does not have proper format, ignored`);
		return;
	}
	return {
		component: module.default,
		key: module.metadata.key,
		draft: module.metadata.draft,
		date: module.metadata.date,
		slug: module.metadata.slug,
		categories: module.metadata.categories,
		tags: module.metadata.tags,
		time: module.metadata.time,
		title: module.metadata.title,
		assets: module.assets,
		summary: module.summary
	};
}

async function listPostsInternal(): Promise<readonly PostMetadata[]> {
	const modules = import.meta.glob('./content/*/index.md');
	const entries: PostMetadata[] = [];
	for (const path in modules) {
		const post = await createPost(path, modules[path]);
		if (!post) {
			console.warn(`Content entry path '${path}' does not have proper format, ignored`);
			continue;
		}
		if (post.draft && !dev) {
			console.info(`Ignoring draft post '${path}' as we are not running in dev mode`);
			continue;
		}
		entries.push(post);
	}

	// Sort from oldest to nevest
	entries.sort((a, b) => a.date.getTime() - b.date.getTime());
	return Object.freeze(entries);
}

export const ENTRIES = listPostsInternal();

/**
 * Get all posts ordered from the earliest to the latest.
 */
export async function getAllPosts(): Promise<readonly PostMetadata[]> {
	return ENTRIES;
}

export async function getPostsByCategory(category: string): Promise<PostMetadata[]> {
	return (await ENTRIES).filter((entry) => entry.categories.includes(category));
}

export async function getPostsByTag(tag: string): Promise<PostMetadata[]> {
	return (await ENTRIES).filter((entry) => entry.tags.includes(tag));
}

export async function getPost(key: string): Promise<PostMetadata | undefined> {
	const posts = await ENTRIES;
	return posts.find((post) => post.key === key);
}

export async function getPostAndSiblings(key: string): Promise<CurrentPost | undefined> {
	const posts = await ENTRIES;
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

export async function aggregateTags(): Promise<string[]> {
	const posts = await getAllPosts();
	return [...new Set(posts.flatMap((post) => post.tags))].sort();
}
