import type { PostRef } from '$lib/types';

export function postLink(post: PostRef): string {
	const year = post.date.getUTCFullYear().toString().padStart(4, '0');
	const month = (post.date.getUTCMonth() + 1).toString().padStart(2, '0');
	const date = post.date.getUTCDate().toString().padStart(2, '0');
	return `/blog/${year}/${month}/${date}/${post.slug}`;
}

const RELATIVE_POST_LINK =
	/^..\/(?<year>\d{4})-(?<month>\d{2})-(?<date>\d{2})-(?<slug>[^/]+)(\/(index.md)?)?$/;

/**
 * Resolves relative links between markdown content to an absolute post links.
 */
export function resolveRelativeLink(href: string): string {
	const matcher = href.match(RELATIVE_POST_LINK);
	if (matcher) {
		const year = parseInt(matcher.groups!.year, 10);
		const month = parseInt(matcher.groups!.month, 10);
		const date = parseInt(matcher.groups!.date, 10);
		return postLink({
			date: new Date(Date.UTC(year, month - 1, date)),
			slug: matcher.groups!.slug
		});
	}
	return href;
}
