import type { PostRef } from '$lib/types';

export function postLink({ ref }: { ref: PostRef }): string {
	const year = ref.year.toString().padStart(4, '0');
	const month = ref.month.toString().padStart(2, '0');
	const date = ref.date.toString().padStart(2, '0');
	return `/blog/${year}/${month}/${date}/${ref.slug}`;
}

const RELATIVE_POST_LINK =
	/^..\/(?<year>\d{4})-(?<month>\d{2})-(?<date>\d{2})-(?<slug>[^/]+)(\/(index.md)?)?$/;

/**
 * Resolves relative links between markdown content to an absolute post links.
 */
export function resolveCrossLink(href: string): string | undefined {
	const matcher = href.match(RELATIVE_POST_LINK);
	if (matcher) {
		return postLink({
			ref: {
				year: parseInt(matcher.groups!.year, 10),
				month: parseInt(matcher.groups!.month, 10),
				date: parseInt(matcher.groups!.date, 10),
				slug: matcher.groups!.slug
			}
		});
	}
}
