import type { CurrentPost, PostMetadata } from './types';

const PATH_REGEXP =
	/content\/(?<year>\d{4})-(?<month>\d{2})-(?<date>\d{2})-(?<slug>[^/]+)\/index.md$/;

async function createPost(
	path: string,
	resolver: () => Record<string, any>
): Promise<PostMetadata | undefined> {
	const matcher = path.match(PATH_REGEXP);
	if (!matcher) {
		console.warn(`Content entry path '${path}' does not have proper format, ignored`);
		return;
	}

	const year = parseInt(matcher.groups!.year, 10);
	const month = parseInt(matcher.groups!.month, 10);
	const date = parseInt(matcher.groups!.date, 10);
	const postDate = new Date(Date.UTC(year, month - 1, date));
	const slug: string = matcher.groups!.slug;
	const module = await resolver();
	const entry: PostMetadata = {
		key: postKey(postDate, slug),
		date: postDate,
		slug,
		categories: module.metadata.categories || [],
		time: module.metadata.time ?? 0,
		title: module.metadata.title,
		assets: module.assets,
		component: module.default
	};
	return entry;
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
		entries.push(post);
	}

	// Sort from oldest to nevest
	entries.sort((a, b) => a.date.getTime() - b.date.getTime());
	return Object.freeze(entries);
}

export function postKey(postDate: Date, slug: string): string {
	const year = postDate.getUTCFullYear().toString().padStart(4, '0');
	const month = (postDate.getUTCMonth() + 1).toString().padStart(2, '0');
	const date = postDate.getUTCDate().toString().padStart(2, '0');
	return `${year}-${month}-${date}-${slug}`;
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
