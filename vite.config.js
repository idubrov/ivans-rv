import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [sveltekit()],
    build: {
        assetsInlineLimit: 0
    }
};

export default config;