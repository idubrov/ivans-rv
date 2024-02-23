import queryString from 'query-string';
import type { Asset, PreparedAsset } from '$lib/types';
import { getContext } from 'svelte';
import { assetsKey } from '$lib/types';

export function lightGalleryLicense(): string | undefined {
	return import.meta.env.VITE_LIGHTGALLERY_LICENSE;
}

export function baseUrl(): URL {
	const url = import.meta.env.VITE_URL ?? 'http://localhost:3000';
	return new URL(url);
}

export function resolveAsset(src: string): Asset | undefined {
	// Load assets from the context
	const assets: Record<string, Asset> = getContext(assetsKey) ?? {};

	const pos = src.indexOf('?');
	const startPos = src.startsWith('./') ? 2 : 0;
	const query = pos !== -1 ? src.slice(pos) : '';
	const asset = pos != -1 ? assets[src.slice(startPos, pos)] : assets[src.slice(startPos)];
	if (asset) {
		return {
			...asset,
			url: `${asset.url}${query}`,
		};
	}
}

/**
 * Prepares asset for rendering. Generates query and inline style to make it fit
 * @param asset
 * @param default_query
 */
export function prepareAsset(asset: Asset, default_query = ''): PreparedAsset {
	const pos = asset.url.indexOf('?');
	const url = pos !== -1 ? asset.url.slice(0, pos) : asset.url;
	const query = pos !== -1 ? asset.url.slice(pos) : default_query;
	const parsed = queryString.parse(query);

	const w = dimension(parsed.w);
	const h = dimension(parsed.h);

	// For high DPI screens, keep image resolution high.
	// FIXME: use srcset
	const smallResolutionImage =
		typeof w !== 'undefined' && w < 1000 && typeof h !== 'undefined' && h < 1000;
	if (smallResolutionImage) {
		// 2x scale the image
		return {
			...asset,
			url: `${url}?nf_resize=${parsed.nf_resize}&w=${w * 2}&h=${h * 2}`,
			style: `object-fit: contain; max-width: ${w}px; max-height: ${h}px; height: auto;`
		};
	}
	return {
		...asset,
		url: `${url}${query}`
	};
}

function dimension(value: string | (string | null)[] | null): number | undefined {
	if (typeof value === 'string') {
		return parseInt(value, 10);
	}
	return undefined;
}
