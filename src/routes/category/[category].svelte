<script context="module" lang="ts">
    import { getPostsByCategory } from '$lib/blog';
    import PostsList from '$lib/components/PostsList.svelte';
    import type { PostMetadata } from '$lib/types';

    export const load = async ( { params }) => {
        const posts = await getPostsByCategory(params.category);
        return {
            props: {
                posts
            }
        };
    };
</script>

<script lang="ts">
    export let posts: PostMetadata[];
</script>

<PostsList {posts} />
