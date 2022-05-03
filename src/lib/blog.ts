import type { PostMetadata } from './types';

const PATH_REGEXP =
	/content\/(?<year>\d{4})-(?<month>\d{2})-(?<date>\d{2})-(?<slug>[^/]+)\/index.md$/;

async function createPost(path: string, resolver: () => Record<string, any>): Promise<PostMetadata | undefined> {
  const matcher = path.match(PATH_REGEXP);
  if (!matcher) {
    console.warn(`Content entry path '${path}' does not have proper format, ignored`)
    return;
  }

  const year = parseInt(matcher.groups!.year, 10);
  const month = parseInt(matcher.groups!.month, 10);
  const date = parseInt(matcher.groups!.date, 10);
  const module = await resolver();
  const entry: PostMetadata = {
    date: new Date(Date.UTC(year, month - 1, date)),
    slug: matcher.groups!.slug,
    categories: module.metadata.categories || [],
    time: module.metadata.time ?? 0,
    title: module.metadata.title,
    assets: module.assets,
    component: module.default,
  };
  return entry;
}

async function listPostsInternal(): Promise<PostMetadata[]> {
  const modules = import.meta.glob("./content/*/index.md");
  const entries: PostMetadata[] = [];
  for (const path in modules) {
    const post = await createPost(path, modules[path]);
    if (!post) {
      console.warn(`Content entry path '${path}' does not have proper format, ignored`)
      continue;
    }
    entries.push(post);
  }

  entries.sort((a , b) => b.date.getTime() - a.date.getTime());
  return entries;
}

export const ENTRIES = listPostsInternal();

export async function getAllPosts(): Promise<PostMetadata[]> {
  return ENTRIES;
}

export async function getPostsByCategory(category: string): Promise<PostMetadata[]> {
  return (await ENTRIES).filter(entry => entry.categories.includes(category))
}


export async function getPost(key: string): Promise<PostMetadata | undefined> {
  const resolver = () => import(`./content/${key}/index.md`);
  return await createPost(`./content/${key}/index.md`, resolver)
}