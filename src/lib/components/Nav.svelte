<script lang="ts">
    import type { CategoryInfo } from "$lib/types";
	export let categories: CategoryInfo[];
</script>

<nav>
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/blog">All updates</a></li>
		<li>
			By Category:
			<ul>
                {#each categories as category}
                    <li>
					    <a href="/category/{category.code}">{category.description} ({category.totalTime} hours, {category.totalLogs} logs)</a>
				    </li>
                {/each}
			</ul>
		</li>
		<li>
			Other:
			<ul>
				<li><a href="/workbenches">Workbenches</a></li>
<!--				<li><a href="/deburring">Deburring</a></li>-->
			</ul>
		</li>
	</ul>
</nav>
