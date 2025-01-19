"use strict";
import { dirname, join } from "path";
import { readdirSync, readFileSync } from "fs";
import yaml from "js-yaml";
const SUMMARY_START = {
  type: "svelteBlock",
  value: '{#if format === "summary" || format === "full" || format === "rss"}',
  name: "if"
};
const SUMMARY_END = {
  type: "svelteBlock",
  value: "{/if}",
  name: "if"
};
const BODY_START = {
  type: "svelteBlock",
  value: '{#if format === "full" || format === "rss"}',
  name: "if"
};
const BODY_END = {
  type: "svelteBlock",
  value: "{/if}",
  name: "if"
};
export function importAssets() {
  return (tree, file) => {
    let assets = [];
    let metas = [];
    if (file.filename.endsWith("/+page.md") || file.filename.endsWith("/index.md")) {
      const dir = dirname(file.filename);
      assets = readdirSync(dir).filter(isAsset);
      metas = assets.map((asset) => {
        const metaPath = join(dir, asset.replace(/.jpeg$/, ".meta.yaml"));
        const metaContent = readFileSync(metaPath, "utf8");
        return yaml.load(metaContent);
      });
    }
    const more = tree.children.findIndex(
      (node) => node.type === "html" && node.value === "<!-- more -->"
    );
    let summary = void 0;
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
    const moduleScript = generateModuleScriptBlock(assets, metas, summary, file.filename);
    const script = generateScriptBlock();
    tree.children.splice(0, 0, moduleScript);
    tree.children.splice(1, 0, script);
    return tree;
  };
}
function isAsset(name) {
  return name.endsWith(".jpeg");
}
function parsePostRef(path) {
  const PATH_REGEXP = /content\/(?<year2>\d{4})\/(?<year>\d{4})-(?<month>\d{2})-(?<date>\d{2})-(?<slug>[^/]+)\/index.md$/;
  const matcher = path.match(PATH_REGEXP);
  if (!matcher) {
    return;
  }
  return {
    year: parseInt(matcher.groups.year, 10),
    month: parseInt(matcher.groups.month, 10),
    date: parseInt(matcher.groups.date, 10),
    slug: matcher.groups.slug
  };
}
function generateModuleScriptBlock(assets, metas, summary, path) {
  const postRef = parsePostRef(path);
  let ref = "";
  if (postRef) {
    ref = `
	metadata.ref = ${JSON.stringify(postRef)},
`;
  }
  return {
    type: "html",
    value: `<script context="module">
${assets.map((asset, index) => `    import asset${index} from "./${asset}";`).join("\n")}
    const assets = {
${assets.map(
      (asset, index) => `        "${asset}": { url: asset${index}, meta: ${JSON.stringify(metas[index])} },`
    ).join("\n")}
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
<\/script>`
  };
}
function generateScriptBlock() {
  return {
    type: "html",
    value: `<script>
    import Mistake from "$lib/components/Mistake.svelte";
    import YouTube from "$lib/components/YouTube.svelte";
    export let format = "full";
<\/script>`
  };
}
function mergeParagraphs(children) {
  return children.flatMap(
    (e) => e.type === "paragraph" ? mergeParagraphs(e.children) : e.type === "text" ? e.value : ""
  ).filter((e) => !!e).join(" ");
}
