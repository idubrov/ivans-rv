import { getAllPosts } from '$lib/blog';
import lunr from 'lunr';

export const get = async () => {
	const posts = await getAllPosts();

	const index = lunr((builder) => {
		builder.ref('id');
		builder.field('title');
		builder.field('body');
		//builder.metadataWhitelist = ['position'];
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

	return {
		body: index,
		headers: {
			'Cache-Control': `max-age=0, s-max-age=${600}`,
			'Content-Type': 'application/json'
		}
	};
};
