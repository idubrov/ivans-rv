<script context="module">
	import dayjs from 'dayjs';
	import { postLink } from '$lib/navigation';
</script>

<script lang="ts">
	import { baseUrl } from '$lib/assets';
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
	<SearchMenu {searchIndex} />
	<!--
    <section class="follow">
        <a target="_blank" href="https://t.me/ivans_rv" rel="noreferrer"
            ><img
                src="/icons8-telegram.svg"
                alt="Telegram icon"
                style="object-fit: cover; width: 24px; height: 24px;"
            /></a
        >
        <a
            href="https://feedly.com/i/subscription/feed%2F{encodeURIComponent(
                new URL('/feed/rss.xml', baseUrl()).toString()
            )}"
            target="blank"
            ><img
                src="/icons8-feedly.svg"
                alt="Feedly icon"
                style="object-fit: cover; width: 24px; height: 24px;"
            /></a
        >
    </section>
    -->
	<section class="recent">
		<h1>Most recent</h1>
		<ul>
			{#each recent as post}
				<li>
					<a href={postLink(post)}>
						<PostThumbnail {post} width={60} height={60} />
						<span class="title">{post.title}</span>
						<time>{dayjs.utc(post.date).format('MMMM D, YYYY')}</time>
					</a>
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
						>{category.description} ({category.totalLogs} posts,
						<TimeSpent time={category.totalTime} />
						)</a
					>
				</li>
			{/each}
		</ul>
	</section>
	<section class="highlights">
		<h1>Highlights</h1>
		<ul>
			<li><a href="/workbenches">Workbenches</a></li>
			<li><a href="/rivets">Rivets</a></li>
		</ul>
	</section>
</nav>
