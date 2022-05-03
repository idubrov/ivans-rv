import fs from 'fs';
import yaml from 'js-yaml';
import type { Category } from '$lib/types';
import { getAllPosts } from '../../lib/blog';

type CategoryTemplate = Pick<Category, 'code' | 'description'>;
export const get = async () => {
	const posts = await getAllPosts();
	const template = yaml.load(
		fs.readFileSync('src/lib/categories.yaml', 'utf8')
	) as CategoryTemplate[];
	const categories: Category[] = template.map((template) => {
		const categoryPosts = posts
			.filter((entry) => entry.categories.includes(template.code));
		return {
			...template,
			totalTime: categoryPosts
				.map((post) => post.time)
				.reduce((a, b) => a + b, 0),
			totalLogs: categoryPosts.length,
		};
	});
	return {
		status: 200,
		body: categories
	};
};
