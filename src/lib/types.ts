import type {SvelteComponent} from "svelte";

export interface PostRef {
  // Date of the post. Note that we use UTC dates internally.
  date: Date,
  slug: string;
}

export interface PostMetadata extends PostRef {
  title: string;
  assets: Asset[];
  categories: string[];
  component: SvelteComponent;
  time: number;
}

export interface Asset {
  url: string;
  alt?: string;
}

export type Assets = Record<string, Asset>;


export interface Category {
  code: string;
  description: string;
}

export interface CategoryInfo extends Category {
  totalTime: number;
  totalLogs: number;
}
