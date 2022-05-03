<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { aggregateCategories } from '$lib/categories';

	export const load: Load = async () => {
		const categories = await aggregateCategories();
		return {
			props: {
				categories
			}
		};
	};
</script>

<script lang="ts">
	import 'ress/dist/ress.min.css';
	import '$lib/styles/main.scss';
	import type { CategoryInfo } from '$lib/types';
	import Nav from '$lib/components/Nav.svelte';

	export let categories: CategoryInfo[];
</script>

<header>Ivan's Vans Aircraft RV-7 Build</header>
<Nav {categories} />
<main>
	<slot />
</main>
<footer>
	<a target="_blank" href="mailto:dubrov.ivan@gmail.com?subject=RV project feedback"
		>Send Feedback</a
	>
</footer>
