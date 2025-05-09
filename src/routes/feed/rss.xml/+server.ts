import type { RequestHandler } from './$types';
import { getAllPostsMetadata } from '$lib/blog';
import { postLink } from '$lib/navigation';
import type { PostMetadata } from '$lib/types';
import { baseUrl } from '$lib/assets';
import image from '$lib/content/2022/2022-05-04-vertical-stabilizer/3-skin-clecoed-2.jpeg';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import type { Component } from 'svelte';
import { render } from 'svelte/server';
import { loadPostAsComponent } from '$lib/blogClient';

dayjs.extend(utc);
dayjs.extend(timezone);

const title = "Ivan's RV-7";

type Post = PostMetadata & { component: Component<any> };

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
	const body = renderRss(baseUrl(), [...posts].reverse());
	return new Response(body, {
		headers: {
			'Cache-Control': `max-age=0, s-max-age=${600}`,
			'Content-Type': 'application/xml'
		}
	});
};

//Be sure to review and replace any applicable content below!
const renderRss = (base: URL, posts: readonly Post[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:webfeeds="http://webfeeds.org/rss/1.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>${title}</title>
        <link>${new URL('/', base)}</link>
        <description>Ivan's RV-7 Build Log</description>
        <webfeeds:cover image="${new URL('/cover.jpeg', base)}" />
		<webfeeds:icon>${new URL('/favicon.png', base)}</webfeeds:icon>
        <image>
          <url>${new URL(image, base)}</url>
          <title>${title}</title>
          <link>${new URL('/', base)}</link>
        </image>
        <atom:link href="${new URL('/feed/rss.xml', base)}" rel="self" type="application/rss+xml"/>
        ${posts
					.map(
						(post) => `<item>
<guid isPermaLink="true">${new URL(postLink(post), base)}</guid>
<title>${post.title}</title>
<link>${new URL(postLink(post), base)}</link>
<description><![CDATA[
	${thumbnail(post)}
	${render(post.component, { props: { format: 'rss' } }).body}
]]></description>
<pubDate>${dayjs.utc(post.date).tz('US/Central', true).toISOString()}</pubDate>
</item>`
					)
					.join('')}
    </channel>
</rss>
`;

// FIXME: should mark with 'webfeedsFeaturedVisual' class instead

function thumbnail(post: Post): string {
	if (!post.thumbnail) {
		return '';
	}

	const asset = post.assets[post.thumbnail];
	return `<p><img src="${asset.url}" alt="${asset.meta?.alt}" /></p>`;
}

export const prerender = true;
