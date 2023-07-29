import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { netlifyEmulator } from "./src/netlifyEmulator"

/** @type {import('vite').UserConfig} */
export default defineConfig({
	plugins: [sveltekit(), netlifyEmulator()],
	build: {
		assetsInlineLimit: 0
	}
});
