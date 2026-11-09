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
    price: z.union([z.number(), z.string(), z.null()]).optional(),
    sold_out: z.boolean().default(false),
    shipping_us: z.number().nullable().optional(),
    shipping_intl: z.number().nullable().optional(),
    shipping_included: z.boolean().default(false),
    summary: z.string(),
    production_details: z.string().optional(),
    images: z.array(
      z.object({
        name: z.string(),
        alt: z.string().default(''),
      })
    ).default([]),
    tags: z.union([z.string(), z.array(z.string())])
      .optional()
      .nullable()
      .transform((val) => {
        if (val === null || val === undefined) return [];
        return Array.isArray(val) ? val : [val];
      }),
    type: z.enum(['default', 'multiple', 'edition']).default('default'),
    shop: z.array(
      z.discriminatedUnion('type', [
        z.object({
          type: z.literal('link'),
          name: z.string(),
          url: z.string(),
        }),
        z.object({
          type: z.literal('button'),
          name: z.string(),
          id: z.string(),
          key: z.string(),
        }),
      ])
    ).default([]),
    edition: z.number().optional(),
    project: z.string().optional(),
    description: z.string().optional(),
  }),
});

const series = defineCollection({
  loader: glob({ base: './src/content/series', pattern: '**/*.yaml' }),
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
