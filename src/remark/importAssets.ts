import { dirname, join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import type { RootContent, Root } from 'mdast';
import yaml from 'js-yaml';
import type { Meta } from '$lib/types';

interface VFile {
	filename: string;
}

const SUMMARY_START = {
	type: 'svelteBlock',
	value: '{#if format === "summary" || format === "full" || format === "rss"}',
	name: 'if'
} as unknown as RootContent;

const SUMMARY_END = {
	type: 'svelteBlock',
	value: '{/if}',
	name: 'if'
} as unknown as RootContent;

const BODY_START = {
	type: 'svelteBlock',
	value: '{#if format === "full" || format === "rss"}',
	name: 'if'
} as unknown as RootContent;

const BODY_END = {
	type: 'svelteBlock',
	value: '{/if}',
	name: 'if'
} as unknown as RootContent;

/**
 * Import static assets co-located with markdown content. Imported assets are available in `assets` map that
 * @returns
 */
export function importAssets(): (tree: Root, file: VFile) => Root {
	return (tree: Root, file: VFile) => {
		let assets: string[] = [];
		let metas: Meta[] = [];

		// Only collect assets for markdown pages which correspond to the whole directory.
		if (file.filename.endsWith('/+page.md') || file.filename.endsWith('/index.md')) {
			const dir = dirname(file.filename);
			assets = readdirSync(dir).filter(isAsset);
			metas = assets.map((asset) => {
				const metaPath = join(dir, asset.replace(/.jpeg$/, '.meta.yaml'));
				const metaContent = readFileSync(metaPath, 'utf8');
				return yaml.load(metaContent) as Meta;
			});
		}

		const more = tree.children.findIndex(
			(node) => node.type === 'html' && node.value === '<!-- more -->'
		);
		let summary: string | undefined = undefined;
		if (more !== -1) {
			summary = mergeParagraphs(tree.children.slice(0, more));
			tree.children.splice(0, 0, SUMMARY_START);
			tree.children.splice(more + 1, 0, SUMMARY_END);
			tree.children.splice(more + 2, 0, BODY_START);
			tree.children.push(BODY_END);
		} else {
			tree.children.splice(0, 0, BODY_START);
			tree.children.push(BODY_END);
		}

		// FIXME: append to an existing block, if necessary.
		const moduleScript = generateModuleScriptBlock(assets, metas, summary, file.filename);
		const script = generateScriptBlock();
		tree.children.splice(0, 0, moduleScript);
		tree.children.splice(1, 0, script);
		return tree;
	};
}

function isAsset(name: string) {
	return name.endsWith('.jpeg');
}

function parsePostRef(path: string): { key: string; date: Date; slug: string } | undefined {
	const PATH_REGEXP =
		/content\/(?<year>\d{4})-(?<month>\d{2})-(?<date>\d{2})-(?<slug>[^/]+)\/index.md$/;

	const matcher = path.match(PATH_REGEXP);
	if (!matcher) {
		return;
	}

	const year = parseInt(matcher.groups!.year, 10);
	const month = parseInt(matcher.groups!.month, 10);
	const date = parseInt(matcher.groups!.date, 10);
	const postDate = new Date(Date.UTC(year, month - 1, date));
	const slug: string = matcher.groups!.slug;
	const key = postKey(postDate, slug);
	return {
		key,
		slug,
		date: postDate
	};
}

function generateModuleScriptBlock(
	assets: string[],
	metas: Meta[],
	summary: string | undefined,
	path: string
): RootContent {
	const postRef = parsePostRef(path);
	let ref = '';
	// For blogs posts, we generate date, slug and a key as well.
	if (postRef) {
		ref = `
	metadata.key = ${JSON.stringify(postRef.key)},
	metadata.slug = ${JSON.stringify(postRef.slug)},
	metadata.date = new Date(${JSON.stringify(postRef.date.toISOString())}),
`;
	}
	return {
		type: 'html',
		value: `<script context="module">
${assets.map((asset, index) => `    import asset${index} from "./${asset}";`).join('\n')}
    const assets = {
${assets
	.map(
		(asset, index) =>
			`        "${asset}": { url: asset${index}, meta: ${JSON.stringify(metas[index])} },`
	)
	.join('\n')}
};
	const summary = ${JSON.stringify(summary)};

	// Standard metadata
${ref}
	metadata.draft = !!metadata.draft;
	metadata.categories = metadata.categories || [];
	metadata.tags = metadata.tags || [];
	metadata.time = parseFloat(metadata.time, 10) || 0;
	metadata.assets = assets;
	metadata.summary = summary;
</script>`
	};
}

function generateScriptBlock(): RootContent {
	return {
		type: 'html',
		value: `<script>
    import Mistake from "$lib/components/Mistake.svelte";
    import YouTube from "$lib/components/YouTube.svelte";
    export let format = "full";
</script>`
	};
}

function mergeParagraphs(children: RootContent[]): string {
	return children
		.flatMap((e) =>
			e.type === 'paragraph' ? mergeParagraphs(e.children) : e.type === 'text' ? e.value : ''
		)
		.filter((e) => !!e)
		.join(' ');
}

function postKey(postDate: Date, slug: string): string {
	const year = postDate.getUTCFullYear().toString().padStart(4, '0');
	const month = (postDate.getUTCMonth() + 1).toString().padStart(2, '0');
	const date = postDate.getUTCDate().toString().padStart(2, '0');
	return `${year}-${month}-${date}-${slug}`;
}
