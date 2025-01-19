import type { PostRef } from '$lib/types';

export function postSearchId(ref: PostRef): string {
	const year = ref.year.toString().padStart(4, '0');
	const month = ref.month.toString().padStart(2, '0');
	const date = ref.date.toString().padStart(2, '0');
	return `${year}-${month}-${date}-${ref.slug}`;
}

const POST_SEARCH_REF = /^(?<year>\d{4})-(?<month>\d{2})-(?<date>\d{2})-(?<slug>[^/]+)?$/;

/**
 * Parses post search id.
 */
export function parsePostSearchId(ref: string): PostRef | undefined {
	const matcher = ref.match(POST_SEARCH_REF);
	if (!matcher) {
		return;
	}
	return {
		year: parseInt(matcher.groups!.year, 10),
		month: parseInt(matcher.groups!.month, 10),
		date: parseInt(matcher.groups!.date, 10),
		slug: matcher.groups!.slug
	};
}
