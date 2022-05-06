<script context="module">
	import dayjs from 'dayjs';
	import { postLink } from '$lib/navigation';
	import { dev } from '$app/env';
</script>

<script lang="ts">
	import type { CategoryInfo } from '$lib/types';
	import PostThumbnail from './PostThumbnail.svelte';
	export let categories: CategoryInfo[];
	export let recent;
</script>

<nav class="sidemenu">
	{#if dev}
		<section role="search">Search &#x1F50D;</section>
	{/if}
	<ul>
		<li>
			<span>Most recent</span>
			<ul>
				{#each recent as post}
					<li>
						<a href={postLink(post)}>
							<PostThumbnail class="thumbnail" {post} width={40} height={40} />
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
							>{category.description} ({category.totalLogs} posts)</a
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
			<li>
				<span>Tags</span>
				<ul>
					<li><a href="/workbenches">Tag1 Tag2 Tag3</a></li>
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
