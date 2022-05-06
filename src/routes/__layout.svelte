<script context="module" lang="ts">
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc.js';
	import type { Load } from '@sveltejs/kit';
	import { aggregateCategories } from '$lib/categories';
	import { getAllPosts } from '$lib/blog';

	dayjs.extend(utc);

	export const load: Load = async () => {
		const categories = await aggregateCategories();
		const posts = await getAllPosts();
		return {
			props: {
				categories,
				recent: [...posts].reverse().slice(0, 2)
			}
		};
	};
</script>

<script lang="ts">
	import 'ress/dist/ress.min.css';
	import '$lib/styles/main.scss';
	import type { CategoryInfo } from '$lib/types';
	import MainMenu from '$lib/components/MainMenu.svelte';
	import SideMenu from '$lib/components/SideMenu.svelte';

	export let categories: CategoryInfo[];
	export let recent;
</script>

<header>Ivan's RV-7</header>
<main>
	<slot />
</main>
<MainMenu />
<SideMenu {categories} {recent} />
