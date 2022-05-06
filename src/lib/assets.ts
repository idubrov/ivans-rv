import queryString from 'query-string';
import type { Asset } from '$lib/types';
import { getContext } from 'svelte';
import { assetsKey } from '$lib/types';

export function isNetlify(): boolean {
	return import.meta.env.VITE_NETLIFY === 'true';
}

export function resolveAsset(src: string): { asset?: Asset; query: string } {
	// Load assets from the context
	const assets: Record<string, Asset> = getContext(assetsKey) ?? {};

	const pos = src.indexOf('?');
	const startPos = src.startsWith('./') ? 2 : 0;
	let query = pos !== -1 ? src.slice(pos) : '';
	const asset = pos != -1 ? assets[src.slice(startPos, pos)] : assets[src.slice(startPos)];
	if (asset && !query) {
		// For assets, use standard size of 480x360
		query = '?nf_resize=fit&w=480&h=360';
	}
	return {
		asset,
		query
	};
}

/**
 * Generates inline style to simulate Netlify transformation API. Only used during local development.
 * @param query
 */
export function simulateNetlifyTransform(query: string): string | undefined {
	const parsed = queryString.parse(query);
	if (parsed.nf_resize) {
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
				return style;
			}
			case 'smartcrop': {
				let style = 'object-fit: cover;';
				if (typeof parsed.w === 'string') {
					style += ` width: ${parsed.w}px;`;
				}
				if (typeof parsed.h === 'string') {
					style += ` height: ${parsed.h}px;`;
				}
				return style;
			}
			default:
				console.warn(`Resize type ${parsed.nf_resize} is not supported!`);
				break;
		}
	}
	return undefined;
}
