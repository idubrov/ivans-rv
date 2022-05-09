import { getAllPosts } from '$lib/blog';
import { postLink } from '$lib/navigation';
import type { PostMetadata } from '$lib/types';
import { baseUrl } from '$lib/assets';
import image from "$lib/content/2022-05-04-vertical-stabilizer/3-skin-clecoed-2.jpeg";

const title = "Ivan's RV-7";

export const get = async () => {
	const posts = await getAllPosts();
	const body = render(baseUrl(), posts);
	return {
		body,
		headers: {
			'Cache-Control': `max-age=0, s-max-age=${600}`,
			'Content-Type': 'application/xml'
		}
	};
};

//Be sure to review and replace any applicable content below!
const render = (
	base: URL,
	posts: readonly PostMetadata[]
) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>${title}</title>
        <link>${new URL('/', base)}</link>
        <description>Ivan's RV-7 Build Log</description>
        <image>
          <url>${new URL(image, base)}</url>
          <title>${title}</title>
          <link>${new URL('/', base)}</link>
        </image>
        <atom:link href="${new URL('/rss.xml', base)}" rel="self" type="application/rss+xml"/>
        ${posts
					.map(
						(post) => `<item>
<guid isPermaLink="true">${new URL(postLink(post), base)}</guid>
<title>${post.title}</title>
<link>${new URL(postLink(post), base)}</link>
<description>${escapeHtml(post.component.render({ format: "rss" }).html)}</description>
<pubDate>${post.date.toUTCString()}</pubDate>
</item>`
					)
					.join('')}
    </channel>
</rss>
`;

function escapeHtml(unsafe: string) {
	return unsafe.replace(/[<>&'"]/g, (c) => {
		switch (c) {
			case '<':
				return '&lt;';
			case '>':
				return '&gt;';
			case '&':
				return '&amp;';
			case "'":
				return '&apos;';
			case '"':
				return '&quot;';
			default:
				return c;
		}
	});
}
