import queryString from 'query-string';
import type { Asset, PreparedAsset } from '$lib/types';
import { getContext } from 'svelte';
import { assetsKey } from '$lib/types';

export function isNetlify(): boolean {
	return import.meta.env.VITE_NETLIFY === 'true';
}

export function lightGalleryLicense(): string | undefined {
	return import.meta.env.VITE_LIGHTGALLERY_LICENSE;
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
			url: `${asset.url}${query}`,
			alt: asset.alt
		};
	}
}

/**
 * Prepares asset for rendering. Generates query and inline style to make it fit
 * @param asset
 * @param default_query
 */
export function prepareAsset(asset: Asset, default_query = ''): PreparedAsset {
	const isRemote = asset.url.startsWith('http://') || asset.url.startsWith('https://');

	const pos = asset.url.indexOf('?');
	const url = pos !== -1 ? asset.url.slice(0, pos) : asset.url;
	const query = pos !== -1 ? asset.url.slice(pos) : default_query;
	const parsed = queryString.parse(query);

	if (isRemote) {
		return asset;
	}

	const w = dimension(parsed.w);
	const h = dimension(parsed.h);
	const smallResolutionImage =
		isNetlify() && typeof w !== 'undefined' && w < 1000 && typeof h !== 'undefined' && h < 1000;
	if (isNetlify()) {
		if (smallResolutionImage) {
			// 2x scale the image

			return {
				...asset,
				url: `${url}?nf_resize=${parsed.nf_resize}&w=${w * 2}&h=${h * 2}`,
				style: `max-width: ${w}px; max-height: ${h}px`
			};
		} else {
			return {
				...asset,
				url: `${url}${query}`
			};
		}
	}

	// Netlify simulation for local development
	switch (parsed.nf_resize) {
		case 'fit': {
			let style = 'object-fit: contain;';
			if (typeof parsed.w === 'string') {
				style += ` max-width: ${parsed.w}px;`;
			}
			if (typeof parsed.h === 'string') {
				style += ` max-height: ${parsed.h}px;`;
			}
			return {
				...asset,
				style
			};
		}
		case 'smartcrop': {
			let style = 'object-fit: cover;';
			if (typeof parsed.w === 'string') {
				style += ` max-width: ${parsed.w}px;`;
			}
			if (typeof parsed.h === 'string') {
				style += ` max-height: ${parsed.h}px;`;
			}
			return {
				...asset,
				style
			};
		}
		default:
			console.warn(`Resize type ${parsed.nf_resize} is not supported!`);
			break;
	}
	return asset;
}

function dimension(value: string | (string | null)[] | null): number | undefined {
	if (typeof value === 'string') {
		return parseInt(value, 10);
	}
	return undefined;
}
