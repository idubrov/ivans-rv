<script context="module">
	import dayjs from 'dayjs';
	import { postLink } from '$lib/navigation';
	import { dev } from '$app/env';
</script>

<script lang="ts">
	import type { CategoryInfo, PostMetadata } from '$lib/types';
	import PostThumbnail from './PostThumbnail.svelte';
	import TimeSpent from './TimeSpent.svelte';
	import SearchMenu from './SearchMenu.svelte';

	export let categories: CategoryInfo[];
	export let tags: string[];
	export let recent: PostMetadata[];
	export let searchIndex: object;
</script>

<nav class="sidemenu">
	{#if dev}
		<SearchMenu {searchIndex} />
	{/if}
	<section class="follow">
		<a target="_blank" href="https://t.me/ivans_rv"
			><img
				src="/icons8-telegram.svg"
				alt="Telegram icon"
				style="object-fit: cover; width: 24px; height: 24px;"
			/></a
		>
		{#if dev}
			<a target="_blank" href="https://t.me/ivans_rv"
				><img
					src="/icons8-instagram.svg"
					alt="Instagram icon"
					style="object-fit: cover; width: 24px; height: 24px;"
				/></a
			>
		{/if}
	</section>
	<section class="recent">
		<h1>Most recent</h1>
		<ul class="recent">
			{#each recent as post}
				<li>
					<a href={postLink(post)}>
						<PostThumbnail {post} width={40} height={40} />
						{post.title}<br />{dayjs.utc(post.date).format('MMMM D, YYYY')}</a
					>
				</li>
			{/each}
		</ul>
	</section>
	<section class="categories">
		<h1>Categories</h1>
		<ul class="categories">
			{#each categories as category}
				<li>
					<a href="/category/{category.code}"
						>{category.description} ({category.totalLogs} posts, <TimeSpent
							time={category.totalTime}
						/>)</a
					>
				</li>
			{/each}
		</ul>
	</section>
	<section class="highlights">
		<h1>Highlights</h1>
		<ul>
			<li><a href="/workbenches">Workbenches</a></li>
			<!--				<li><a href="/deburring">Deburring</a></li>-->
		</ul>
	</section>
	<section class="tags">
		<h1>Tags</h1>
		<ul>
			{#each tags as tag}
				<li>
					<a href="/tag/{tag}">{tag}</a>
				</li>
			{/each}
		</ul>
	</section>
	{#if dev}
		<section class="lesson">
			<h1>Lesson of the day</h1>
			<ul>
				<li><p>Slow and steady wins the race</p></li>
			</ul>
		</section>
	{/if}
</nav>
