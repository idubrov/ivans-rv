import queryString from "query-string";
import type {Asset} from "$lib/types";
import {getContext} from "svelte";

export const assetsKey = Symbol("assets");

export function isNetlify(): boolean {
    return import.meta.env.VITE_NETLIFY === "true";
}

export function resolveAsset(src: string): { asset?: Asset, query: string } {
    // Load assets from the context
    const assets: Record<string, Asset> = getContext(assetsKey) ?? {};

    const pos = src.indexOf('?');
    const startPos = src.startsWith("./") ? 2 : 0;
    const query = pos !== -1 ? src.slice(pos) : "";
    const asset = pos != -1
      ? assets[src.slice(startPos, pos)]
      : assets[src.slice(startPos)];
    return {
        asset,
        query,
    };
}

export function simulateNetlifyStyle(query: string): string | undefined {
    const parsed = queryString.parse(query);
    if (parsed.nf_resize) {
        // Netlify simulation for local development
        switch (parsed.nf_resize) {
            case "fit": {
                let style = "object-fit: contain;";
                if (typeof parsed.w === "string") {
                    style += ` max-width: ${parsed.w}px;`;
                }
                if (typeof parsed.h === "string") {
                    style += ` max-height: ${parsed.h}px;`;
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