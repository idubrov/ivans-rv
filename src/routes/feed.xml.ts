import { getAllPosts } from '$lib/blog';
import { postLink } from '$lib/navigation';
import type { PostMetadata } from '$lib/types';
import { baseUrl } from '$lib/assets';
import image from '$lib/content/2022-05-04-vertical-stabilizer/3-skin-clecoed-2.jpeg';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

const title = "Ivan's RV-7";

export const get = async () => {
	const posts = await getAllPosts();
	const body = render(baseUrl(), [...posts].reverse());
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
<description>
	${thumbnail(post)}
	${escapeHtml(post.component.render({ format: 'rss' }).html)}
</description>
<pubDate>${dayjs.utc(post.date).tz("US/Central", true).toISOString()}</pubDate>
</item>`
					)
					.join('')}
    </channel>
</rss>
`;

function thumbnail(post: PostMetadata) : string {
	if (!post.thumbnail) {
		return "";
	}

	const asset = post.assets[post.thumbnail];
	return `<p><img src="${asset.url}" alt="${asset.alt}" /></p>`;
}

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
