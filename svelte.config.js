import adapter from '@sveltejs/adapter-static';
import { sveltePreprocess } from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { importAssets } from './importAssets.js';
import { join } from "node:path";

// Make variables visible for the vite
if (process.env.NETLIFY) {
	process.env.VITE_NETLIFY = process.env.NETLIFY;
}
if (process.env.LIGHTGALLERY_LICENSE) {
	process.env.VITE_LIGHTGALLERY_LICENSE = process.env.LIGHTGALLERY_LICENSE;
}
if (process.env.URL) {
	process.env.VITE_URL = process.env.URL;
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		sveltePreprocess({
			preserve: ['module']
		}),
		mdsvex({
			extensions: ['.md'],
			remarkPlugins: [importAssets],
			rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
			smartypants: false,
			layout: {
				standalone: join(import.meta.dirname, './src/routes/(standalone)/+layout.svelte'),
				_: join(import.meta.dirname, './src/routes/(blog)/+layout.svelte'),
			}
		})
	],

	kit: {
		adapter: adapter()
	},

	extensions: ['.svelte', '.md']
};

export default config;
