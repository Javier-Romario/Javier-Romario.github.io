import { defineCollection, reference } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const series = defineCollection({
  loader: file('src/content/series.json'),
  schema: z.object({
    title: z.string(),
    blurb: z.string(),
    tone: z.enum(['teal', 'magenta', 'violet', 'blue', 'green']),
    tag: z.string(), // short label e.g. "11 STEPS"
  }),
});

const posts = defineCollection({
  loader: file('src/content/posts.json'),
  schema: z.object({
    series: reference('series'),
    slug: z.string(),
    title: z.string(),
    tag: z.string(), // step number, zero-padded
    blurb: z.string(),
    updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // last-updated date
    formula: z.string().optional(), // iso-tactics: the one thing to remember
    takeaway: z.string().optional(), // neon-native: the ONE thing to remember
    time: z.number().optional(), // rough minutes
    phase: z.string().optional(), // neon-native phase id
  }),
});

export const collections = { series, posts };
