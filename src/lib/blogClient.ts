import type { Post, PostMetadata } from './types';
import { dev } from '$app/environment';

async function createPost(
	path: string,
	resolver: () => Promise<Record<string, any>>
): Promise<Post | undefined> {
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
		assets: module.metadata.assets,
		summary: module.metadata.summary,
		thumbnail: module.metadata.thumbnail
	};
}

type Resolver = () => Promise<Record<string, any>>;

export async function resolveCreatePost(
	path: string,
	resolver: Resolver
): Promise<Post | undefined> {
	const post = await createPost(path, resolver);
	if (!post) {
		console.warn(`Content entry path '${path}' does not have proper format, ignored`);
		return undefined;
	}
	if (post.draft && !dev) {
		console.info(`Ignoring draft post '${path}' as we are not running in dev mode`);
		return undefined;
	}
	return post;
}

export async function hydratePost(post: PostMetadata): Promise<Post> {
	const component = (await import(`./content/${post.key}/index.md`)).default;
	return {
		...post,
		component
	};
}

export async function getPost(key: string): Promise<PostMetadata | undefined> {
	const path = `./content/${key}/index.md`;
	return resolveCreatePost(path, () => import(`./content/${key}/index.md`));
}

export async function hydratePosts(posts: readonly PostMetadata[]): Promise<Post[]> {
	return await Promise.all(posts.map(hydratePost));
}
