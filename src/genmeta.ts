import path from 'path';
import { readdir, readFile, writeFile, lstat } from 'fs/promises';
import sizeOf from 'image-size';
import yaml from 'js-yaml';
import type { Meta } from '$lib/types';
import { fileURLToPath } from 'url';

async function checkDirectory(directory: string) {
	const files = await readdir(directory);
	for (const file of files) {
		const filePath = path.join(directory, file);
		const stats = await lstat(filePath);
		if (stats.isDirectory()) {
			await checkDirectory(filePath);
		} else if (stats.isFile() && file.endsWith('.jpeg')) {
			const dimensions = sizeOf(path.join(directory, file));
			const metaFile = file.replace('.jpeg', '.meta.yaml');
			const metaFilePath = path.join(directory, metaFile);
			let meta: Meta;
			try {
				meta = yaml.load(await readFile(metaFilePath, 'utf-8')) as Meta;
			} catch (e) {
				meta = {
					width: 0,
					height: 0,
					alt: ''
				};
			}
			if (meta.width !== dimensions.width || meta.height !== dimensions.height) {
				meta.width = dimensions.width ?? 0;
				meta.height = dimensions.height ?? 0;
				await writeFile(metaFilePath, yaml.dump(meta));
			}
		}
	}
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
await checkDirectory(__dirname);
