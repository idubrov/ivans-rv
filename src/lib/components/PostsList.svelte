<script lang="ts">
	import dayjs from 'dayjs';
	import PostThumbnail from './PostThumbnail.svelte';
	import TimeSpent from './TimeSpent.svelte';
	import { postLink } from '$lib/navigation';
	import type { PostMetadata } from '$lib/types';
	import { loadPostAsComponent } from '$lib/blogClient.js';

	export let posts: PostMetadata[];
</script>

<ul class="postslist">
	{#each posts as post}
		<li>
			<a href={postLink(post)}>
				<h1>
					{post.title}<TimeSpent time={post.time} />
				</h1>
			</a>
			<h2>{dayjs.utc(post.date).format('MMMM D, YYYY')}</h2>
			<a href={postLink(post)}>
				<PostThumbnail {post} />
			</a>
			{#await loadPostAsComponent(post.ref) then component}
				<svelte:component this={component} format="summary" />
			{/await}
			<a href={postLink(post)}>
				<h3>Continue reading &rarr;</h3>
			</a>
			{#if post.tags.length > 0}
				<h2 class="tagged">
					Tagged:
					{#each post.tags as tag}
						<a href="/tag/{tag}">{tag}</a>&nbsp;
					{/each}
				</h2>
			{/if}
		</li>
	{/each}
</ul>
