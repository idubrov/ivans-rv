import type { PostMetadata } from './types';
import { dev } from '$app/environment';
import type { Component } from 'svelte';

function createPostFromModuleResolver(
	path: string,
	module: Record<string, any>
): PostMetadata | undefined {
	if (!module.metadata.key) {
		console.warn(`Content entry path '${path}' does not have proper format, ignored`);
		return;
	}
	const post = {
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
	if (post.draft && !dev) {
		console.info(`Ignoring draft post '${path}' as we are not running in dev mode`);
		return undefined;
	}
	return post;
}

type Resolver = () => Promise<Record<string, any>>;

export async function loadPosts(): Promise<readonly PostMetadata[]> {
	const modules: Record<string, Resolver> = import.meta.glob('./content/*/index.md');

	const asyncEntries = Object.entries(modules).map(([path, resolver]) =>
		resolver().then((module) => createPostFromModuleResolver(path, module))
	);
	const entries = (await Promise.all(asyncEntries)).filter(
		(item): item is PostMetadata => typeof item !== 'undefined'
	);

	// Sort from oldest to newest
	entries.sort((a, b) => a.date.getTime() - b.date.getTime());
	return Object.freeze(entries);
}

type ComponentProps = {
	format: string;
}

export async function loadPostAsComponent(post: PostMetadata): Promise<Component<ComponentProps>> {
	return import(`./content/${post.key}/index.md`).then((module) => module.default);
}

export async function loadPostByKey(key: string): Promise<PostMetadata | undefined> {
	return createPostFromModuleResolver(
		`./content/${key}/index.md`,
		await import(`./content/${key}/index.md`)
	);
}
