<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/api/categories.json');
		const categories = await res.json();
		return {
			props: {
				categories,
			}
		};
	};
</script>

<script lang="ts">
	import 'ress/dist/ress.min.css';
  	import '$lib/styles/main.scss'
	import type { Category } from '$lib/categories';
	import Nav from '$lib/components/Nav.svelte';
	export let categories: Category[];
</script>

<header>Ivan's Vans Aircraft RV-7 Build</header>
<Nav categories={categories} />
<main>
	<article>
		<slot />
	</article>
</main>
<footer>
	<a target="_blank" href="mailto:dubrov.ivan@gmail.com?subject=RV project feedback"
		>Send Feedback</a
	>
</footer>
