<script lang="ts">
	import dayjs from 'dayjs';
	import lunr from 'lunr';
	import { loadPostBySearchKey } from '$lib/blogClient';
	import { postLink } from '$lib/navigation';
	import PostThumbnail from './PostThumbnail.svelte';
	import type { PostMetadata } from '$lib/types';
	import { parsePostSearchId } from '$lib/search.js';
	const { Index } = lunr;

	export let searchIndex: object;

	const index = Index.load(searchIndex);
	let last: string | undefined;
	let results: PostMetadata[] | undefined;
	async function search(e: any) {
		const term = e.target.value.trim();
		if (!term) {
			results = undefined;
			last = undefined;
		} else if (last !== term) {
			last = term;
			const searchResults = index.search(term).slice(0, 10);
			results = (await Promise.all(
				searchResults
					.map((result => parsePostSearchId(result.ref)))
					.filter(ref => typeof ref !== "undefined")
					.map(loadPostBySearchKey)
			)).filter((post): post is PostMetadata => post !== undefined);
		}
	}
</script>

<section role="search" class="search">
	<input type="search" placeholder="&#x1F50D;   Search" on:search={search} on:change={search} />
	{#if results}
		{#if results.length === 0}
			<h3>no results</h3>
		{:else}
			<h3>{results.length} RESULTS</h3>
			<ul>
				{#each results as post}
					<li>
						<a href={postLink(post)}>
							<PostThumbnail {post} width={60} height={60} /><span>
								{post.title}<br />{dayjs.utc(post.date).format('MMMM D, YYYY')}</span
							></a
						>
					</li>
				{/each}
			</ul>
		{/if}
	{/if}
</section>
