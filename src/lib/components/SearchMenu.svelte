<script lang="ts">
	import dayjs from 'dayjs';
	import { Index } from 'lunr';
	import { getPost } from '$lib/blog';
	import { postLink } from '$lib/navigation';
	import PostThumbnail from './PostThumbnail.svelte';
	import type { PostMetadata } from '$lib/types';

	export let searchIndex: object;

	const index = Index.load(searchIndex);
	let last: string | undefined;
	let results: PostMetadata[];
	async function search(e) {
		const term = e.target.value.trim();
		if (!term) {
			results = undefined;
			last = undefined;
		} else if (last !== term) {
			last = term;
			const searchResults = index.search(term).slice(0, 10);
			results = await Promise.all(searchResults.map((result) => getPost(result.ref)));
		}
	}
</script>

<section role="search">
	<input type="search" placeholder="&#x1F50D;   Search" on:search={search} on:change={search} />
	{#if results}
		{#if results.length === 0}
			<div>No results</div>
		{:else}
			<ul>
				{#each results as post}
					<li>
						<a href={postLink(post)}>
							<PostThumbnail {post} width={40} height={40} />
							{post.title}<br />{dayjs.utc(post.date).format('MMMM D, YYYY')}</a
						>
					</li>
				{/each}
			</ul>
		{/if}
	{/if}
</section>
