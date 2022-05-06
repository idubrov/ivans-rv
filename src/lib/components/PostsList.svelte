<script context="module" lang="ts">
	import dayjs from 'dayjs';
	import { postLink } from '$lib/navigation';
	import type { PostMetadata } from '$lib/types';
	import { dev } from '$app/env';
</script>

<script lang="ts">
	import PostThumbnail from './PostThumbnail.svelte';
	export let posts: PostMetadata[];
</script>

{#each posts as post}
	<ul class="postslist">
		<li>
			<a href={postLink(post)}>
				<h1>{post.title}</h1>
				<h2>{dayjs.utc(post.date).format('MMMM D, YYYY')}</h2>
			</a>
			<PostThumbnail {post} />
			<p><svelte:component this={post.component} format="summary" /></p>
			<a href={postLink(post)}>
				<h3>Continue reading &rarr;</h3>
			</a>
			{#if dev}
				<!-- FIXME -->
				<h2>Tagged <span>Know-how</span></h2>
			{/if}
		</li>
	</ul>
{/each}
