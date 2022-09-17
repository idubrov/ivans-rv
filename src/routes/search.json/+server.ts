import type { RequestHandler } from './$types';
import { getAllPostsMetadata } from '$lib/blog';
import lunr from 'lunr';
import { hydratePosts } from '$lib/blogClient';

export const GET: RequestHandler = async () => {
	const posts = await hydratePosts(await getAllPostsMetadata());

	const index = lunr((builder) => {
		builder.ref('id');
		builder.field('title');
		builder.field('body');
		posts.forEach((post) => {
			const body = post.component.render({ format: 'rss' }).html;
			const doc = {
				id: post.key,
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
