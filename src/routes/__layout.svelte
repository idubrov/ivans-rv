<script context="module">
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc.js';
	import { aggregateCategories, aggregateTags } from '$lib/blog';
	import { getAllPosts } from '$lib/blog';

	dayjs.extend(utc);

	export const load = async () => {
		const categories = await aggregateCategories();
		const tags = await aggregateTags();
		const posts = await getAllPosts();
		return {
			props: {
				categories,
				tags,
				recent: [...posts].reverse().slice(0, 5)
			}
		};
	};
</script>

<script>
	import 'ress/dist/ress.min.css';
	import '$lib/styles/main.scss';
	import MainMenu from '$lib/components/MainMenu.svelte';
	import SideMenu from '$lib/components/SideMenu.svelte';

	export let categories;
	export let recent;
	export let tags;
</script>

<svelte:head>
	<title>Ivan's RV-7</title>
</svelte:head>

<header class="main">Ivan's RV-7</header>
<main>
	<slot />
</main>
<MainMenu />
<SideMenu {categories} {tags} {recent} />
