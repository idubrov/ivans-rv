<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = ({ params }) => {
		return {
			props: {
				category: params.category
			}
		};
	};
</script>

<script lang="ts">
	import type {Category} from "$lib/types";
    export let category: Category;
</script>

Some category... {category}
