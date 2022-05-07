import type { SvelteComponent } from 'svelte';

export interface PostRef {
	// Date of the post. Note that we use UTC dates internally.
	date: Date;
	slug: string;
}

export interface PostMetadata extends PostRef {
	key: string;
	draft: boolean;
	title: string;
	assets: Record<string, Asset>;
	categories: string[];
	tags: string[];
	component: SvelteComponent;
	time: number;
}

export interface CurrentPost {
	previous?: PostMetadata;
	current: PostMetadata;
	next?: PostMetadata;
}

export interface Asset {
	url: string;
	alt?: string;
}

export type Assets = Record<string, Asset>;

export const assetsKey = Symbol('assets');

export interface Category {
	code: string;
	description: string;
}

export interface CategoryInfo extends Category {
	totalTime: number;
	totalLogs: number;
}

export const galleryKey = Symbol('gallery');

/**
 * Open given asset in the light gallery. Provided via readable store in the `galleryKey` context.
 */
export interface GalleryOpener {
	openAsset(asset: Asset): void;
}

export interface PreparedAsset extends Asset {
	style?: string;
}
