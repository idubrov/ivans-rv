import queryString from 'query-string';
import type { Asset, PreparedAsset } from '$lib/types';
import { getContext } from 'svelte';
import { assetsKey } from '$lib/types';

export function isNetlify(): boolean {
	return import.meta.env.VITE_NETLIFY === 'true';
}

export function resolveAsset(src: string): Asset {
	// Load assets from the context
	const assets: Record<string, Asset> = getContext(assetsKey) ?? {};

	const pos = src.indexOf('?');
	const startPos = src.startsWith('./') ? 2 : 0;
	// FIXME: don't default here...
	const query = pos !== -1 ? src.slice(pos) : '?nf_resize=fit&w=480&h=360';
	const asset = pos != -1 ? assets[src.slice(startPos, pos)] : assets[src.slice(startPos)];
	if (asset) {
		return {
			url: `${asset.url}${query}`,
			alt: asset.alt
		};
	} else {
		return {
			url: src
		};
	}
}

/**
 * Generates inline style to simulate Netlify transformation API. Only used during local development.
 * @param asset
 * @param default_query
 */
export function prepareAsset(asset: Asset, default_query = ""): PreparedAsset {
	const isRemote = asset.url.startsWith('http://') || asset.url.startsWith('https://');
	if (isNetlify() || isRemote) {
		return asset;
	}

	const pos = asset.url.indexOf("?");
	const query = pos !== -1 ? asset.url.slice(pos) : default_query;
	const parsed = queryString.parse(query);

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
				style += ` width: ${parsed.w}px;`;
			}
			if (typeof parsed.h === 'string') {
				style += ` height: ${parsed.h}px;`;
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
