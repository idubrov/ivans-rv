import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import { netlifyEmulator } from "./src/netlifyEmulator"

/** @type {import('vite').UserConfig} */
export default defineConfig({
	plugins: [sveltekit(), netlifyEmulator()],
	build: {
		assetsInlineLimit: 0
	},
	server: {
		fs: {
			allow: [
				searchForWorkspaceRoot(process.cwd()),
				'/static',
			],
		},
	},
});
