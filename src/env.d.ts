/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_NETLIFY: string;
	readonly VITE_LIGHTGALLERY_LICENSE?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
