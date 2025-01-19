import type { PostMetadata, PostRef } from './types';
import { dev } from '$app/environment';
import type { Component } from 'svelte';

function createPostFromModuleResolver(
	path: string,
	module: Record<string, any>
): PostMetadata | undefined {
	if (!module.metadata.ref) {
		console.warn(`Content entry path '${path}' does not have proper format, ignored`);
		return;
	}
	const ref: PostRef = module.metadata.ref;
	const post = {
		ref: module.metadata.ref,
		date: new Date(Date.UTC(ref.year, ref.month - 1, ref.date)),
		draft: module.metadata.draft,
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
	const modules: Record<string, Resolver> = import.meta.glob('./content/*/*/index.md');

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
};

function importPost(ref: PostRef) {
	return import(`./content/${ref.year}/${postPath(ref)}/index.md`);
}

export async function loadPostAsComponent(ref: PostRef): Promise<Component<ComponentProps>> {
	return importPost(ref).then((module) => module.default);
}

export async function loadPostBySearchKey(ref: PostRef): Promise<PostMetadata | undefined> {
	return createPostFromModuleResolver(postPath(ref), await importPost(ref));
}

function postPath(ref: PostRef): string {
	const year = ref.year.toString().padStart(4, '0');
	const month = ref.month.toString().padStart(2, '0');
	const date = ref.date.toString().padStart(2, '0');
	return `${year}-${month}-${date}-${ref.slug}`;
}
