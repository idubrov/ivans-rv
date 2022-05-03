<script lang="ts">
    import { postLink } from "$lib/navigation";
    import type { PostMetadata } from "$lib/types";
    import PostThumbnail from "./PostThumbnail.svelte";
    export let posts: PostMetadata[];
</script>
{#each posts as post}
    <ul>
        <li>
            <a href={postLink(post)}>
                <PostThumbnail {post} /> {post.date.toISOString()}
            </a>
            <svelte:component this={post.component} format="summary" />
        </li>
    </ul>
{/each}