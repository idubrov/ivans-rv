<script context="module">
    import { getPost } from "$lib/blog";

    export const load = async ({ params }) => {
        const key = `${params.year}-${params.month}-${params.date}-${params.slug}`;
        try {
            const post = await getPost(key);
            return {
                props: {
                    PostContent: post.component,
                }
            }
        } catch (error) {
            return {
                status: 404,
                error: error.message
            }
        }
    }
</script>
<script>
    export let PostContent
</script>
<svelte:component this={PostContent} />