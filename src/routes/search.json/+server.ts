// import type { RequestHandler } from './$types';
import { render } from 'svelte/server';
import { getAllPostsMetadata } from '$lib/blog';
import lunr from 'lunr';
import { loadPostAsComponent } from '$lib/blogClient';
import type { RequestHandler } from '@sveltejs/kit';
import { postSearchId } from '$lib/search';

export const GET: RequestHandler = async () => {
	const postsMetadata = await getAllPostsMetadata();
	const posts = await Promise.all(
		postsMetadata.map((post) =>
			loadPostAsComponent(post.ref).then((component) => ({
				...post,
				component
			}))
		)
	);

	const index = lunr((builder) => {
		builder.ref('id');
		builder.field('title');
		builder.field('body');
		posts.forEach((post) => {
			const body = render(post.component, { props: { format: 'rss' } }).body;
			const doc = {
				id: postSearchId(post.ref),
				title: post.title,
				body
			};
			builder.add(doc);
		});
	});

	return new Response(JSON.stringify(index), {
		headers: {
			'Cache-Control': `max-age=0, s-max-age=${600}`,
			'Content-Type': 'application/json'
		}
	});
};

export const prerender = true;
