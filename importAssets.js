// @ts-nocheck
import { dirname, join } from "path";
import { readdirSync, readFileSync } from "fs";

function isAsset(name) {
    return name.endsWith(".jpeg");
}

/**
 * Import static assets co-located with markdown content. Imported assets are available in `assets` map that 
 * @param {} options 
 * @returns 
 */
export function importAssets(options = {}) {
    return (tree, file) => {
        let assets = [];
        let alts = [];

        // Only collect assets for markdown pages which correspond to the whole directory.
        if (file.filename.endsWith("/index.md")) {
            const dir = dirname(file.filename);
            assets = readdirSync(dir).filter(isAsset);
            alts = assets.map(asset => readFileSync(join(dir, `${asset}.txt`), "utf8"));
        }

        // FIXME: append to an existing block, if necessary.
        const moduleScript = {
            type: 'html',
            value: `<script context="module">
${assets.map((asset, index) => `    import asset${index} from "./${asset}";`).join("\n")}
    export const assets = {
${assets.map((asset, index) => `        "${asset}": { url: asset${index}, alt: ${JSON.stringify(alts[index])} },`).join("\n")}
};
</script>`,
          };
        tree.children.splice(0, 0, moduleScript);

        // FIXME: append to an existing block, if necessary
        const script = {
            type: 'html',
            value: `<script>
    import { setContext } from 'svelte';
    import { assetsKey } from '$lib/assets';
    setContext(assetsKey, assets);
</script>`,
        };
        tree.children.splice(1, 0, script);
        return tree;
    }
}
