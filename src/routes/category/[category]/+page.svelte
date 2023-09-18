<script lang="ts">
	import PostsList from '$lib/components/PostsList.svelte';

	export let data;
</script>

<PostsList posts={data.posts} />
