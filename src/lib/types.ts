export interface PostRef {
	year: number;
	month: number;
	date: number;
	slug: string;
}

export interface PostMetadata {
	ref: PostRef;
	date: Date;
	draft: boolean;
	title: string;
	summary: string;
	assets: Record<string, Asset>;
	categories: string[];
	tags: string[];
	time: number;
	thumbnail?: string;
}

export interface CurrentPost {
	previous?: PostMetadata;
	current: PostMetadata;
	next?: PostMetadata;
}

export interface Meta {
	alt: string;
	width: number;
	height: number;
}

export interface Asset {
	url: string;
	meta?: Meta;
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
	openAsset(asset: { url: string }): boolean;
}

export interface PreparedAsset extends Asset {
	style?: string;
}
