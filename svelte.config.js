import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { importAssets } from './importAssets.js';

// Make variable visible for the vite
process.env.VITE_NETLIFY = process.env.NETLIFY;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			preserve: ['module']
		}),
		mdsvex({
			extensions: ['.md'],
			remarkPlugins: [importAssets],
			rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
			smartypants: false,
			layout: './src/routes/__layout-content@default.svelte'
		})
	],

	kit: {
		adapter: adapter(),
		prerender: {
			default: true
		},
		vite: {
			build: {
				assetsInlineLimit: 0
			}
		}
	},

	extensions: ['.svelte', '.md']
};

export default config;
