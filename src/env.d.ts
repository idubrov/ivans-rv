/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_NETLIFY: string;
	readonly VITE_LIGHTGALLERY_LICENSE?: string;
	readonly VITE_URL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
