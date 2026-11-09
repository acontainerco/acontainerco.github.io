import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    artists: z.array(
      z.object({
        name: z.string(),
        photo: z.string().optional(),
        bio: z.string().optional(),
      })
    ).default([]),
    slug: z.string(),
    price: z.union([z.number(), z.string(), z.null()]).optional(),
    sold_out: z.boolean().default(false),
    shipping_us: z.union([z.number(), z.string(), z.null()]).optional(),
    shipping_intl: z.union([z.number(), z.string(), z.null()]).optional(),
    summary: z.string(),
    production_details: z.string().optional(),
    images: z.array(
      z.object({
        name: z.string(),
        alt: z.string().default(''),
      })
    ).default([]),
    tags: z.union([z.string(), z.array(z.string())])
      .transform((val) => {
        const arr = Array.isArray(val) ? val : [val];
        // Replicate Eleventy's directory data file (src/projects/projects.json)
        // which adds the "projects" tag to every project.
        return arr.includes('projects') ? arr : ['projects', ...arr];
      }),
    shop: z.union([
      z.string(),
      z.array(
        z.object({
          name: z.string(),
          id: z.string(),
          key: z.string(),
        })
      ),
    ]).optional(),
    edition: z.number().optional(),
    project: z.string().optional(),
    description: z.string().optional(),
    layout: z.string().optional(),
  }),
});

const series = defineCollection({
  loader: glob({ base: './src/data/series', pattern: '**/*.yaml' }),
  schema: z.object({
    title: z.string(),
    artists: z.array(
      z.object({
        name: z.string(),
        image: z.string().optional(),
        bio: z.string().optional(),
      })
    ).default([]),
    images: z.array(z.string()).default([]),
    description: z.string(),
    series: z.string(),
  }),
});

export const collections = { projects, series };
