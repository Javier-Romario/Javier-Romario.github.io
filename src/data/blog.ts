// Blog series + post accessors. Data + schema live in content collections
// (src/content/series.json, src/content/posts.json, src/content.config.ts) —
// malformed entries fail the build, not silently at runtime.

import { getCollection, getEntry } from 'astro:content';

export interface Series {
  id: string;
  title: string;
  blurb: string;
  tone: 'teal' | 'magenta' | 'violet' | 'blue' | 'green';
  tag: string;
}

export interface Post {
  series: string;
  slug: string;
  title: string;
  tag: string;
  blurb: string;
  updated: string;
  formula?: string;
  takeaway?: string;
  time?: number;
  phase?: string;
}

export async function allSeries(): Promise<Series[]> {
  const entries = await getCollection('series');
  return entries.map((e) => ({ id: e.id, ...e.data }));
}

export async function seriesById(id: string): Promise<Series | undefined> {
  const entry = await getEntry('series', id);
  return entry ? { id: entry.id, ...entry.data } : undefined;
}

export async function postsInSeries(id: string): Promise<Post[]> {
  const entries = await getCollection('posts', (e) => e.data.series.id === id);
  return entries
    .map((e) => ({ ...e.data, series: e.data.series.id }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

export async function neighbors(series: string, slug: string) {
  const list = await postsInSeries(series);
  const i = list.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? list[i - 1] : null,
    next: i >= 0 && i < list.length - 1 ? list[i + 1] : null,
    index: i,
  };
}
