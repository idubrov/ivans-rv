<script context="module">
	import dayjs from 'dayjs';
	import { postLink } from '$lib/navigation';
	import { dev } from '$app/env';
</script>

<script lang="ts">
	import type { CategoryInfo, PostMetadata } from '$lib/types';
	import PostThumbnail from './PostThumbnail.svelte';
	import TimeSpent from './TimeSpent.svelte';

	export let categories: CategoryInfo[];
	export let recent: PostMetadata[];
</script>

<nav class="sidemenu">
	{#if dev}
		<section role="search">Search &#x1F50D;</section>
	{/if}
	<section class="follow">
		<a target="_blank" href="https://t.me/ivans_rv"
			><img
				src="/icons8-telegram.svg"
				alt="Telegram icon"
				style="object-fit: cover; width: 24px; height: 24px;"
			/></a
		>
		<a target="_blank" href="https://t.me/ivans_rv"
			><img
				src="/icons8-instagram.svg"
				alt="Instagram icon"
				style="object-fit: cover; width: 24px; height: 24px;"
			/></a
		>
	</section>
	<ul>
		<li>
			<span>Most recent</span>
			<ul>
				{#each recent as post}
					<li>
						<a href={postLink(post)}>
							<PostThumbnail {post} width={40} height={40} />
							{post.title}<br />{dayjs.utc(post.date).format('MMMM D, YYYY')}</a
						>
					</li>
				{/each}
			</ul>
		</li>
		<li>
			<span>Categories</span>
			<ul>
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
		</li>
		<li>
			<span>Highlights</span>
			<ul>
				<li><a href="/workbenches">Workbenches</a></li>
				<!--				<li><a href="/deburring">Deburring</a></li>-->
			</ul>
		</li>
		{#if dev}
			<!-- FIXME -->
			<li class="tags">
				<span>Tags</span>
				<ul>
					<li>
						<a href="/workbenches">Tag1</a>
						<a href="/workbenches">Tag2</a>
						<a href="/workbenches">Tag3</a>
					</li>
				</ul>
			</li>
			<li>
				<span>Lesson of the day</span>
				<ul>
					<li><p>Slow and steady wins the race</p></li>
				</ul>
			</li>
		{/if}
	</ul>
</nav>
