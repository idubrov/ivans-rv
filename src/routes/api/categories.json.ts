import fs from 'fs';
import yaml from 'js-yaml';

export const get = async () => {
	const categories = yaml.load(fs.readFileSync('src/lib/categories.yaml', 'utf8'));
	return {
		status: 200,
		body: categories
	};
};
