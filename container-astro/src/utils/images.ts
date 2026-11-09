import type { ImageMetadata } from 'astro';

const projectImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/img/projects/**/*.{jpg,jpeg,png,gif,webp}'
);

const peopleImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/img/people/*.{jpg,jpeg,png,gif,webp}'
);

export async function getProjectImage(
  slug: string,
  filename: string
): Promise<ImageMetadata> {
  const path = `/src/assets/img/projects/${slug}/${filename}`;
  const match = projectImages[path];
  if (!match) {
    throw new Error(`Project image not found: ${path}`);
  }
  const mod = await match();
  return mod.default;
}

export async function getPeopleImage(
  filename: string | undefined
): Promise<ImageMetadata | undefined> {
  if (!filename) return undefined;
  const path = `/src/assets/img/people/${filename}`;
  const match = peopleImages[path];
  if (!match) {
    throw new Error(`People image not found: ${path}`);
  }
  const mod = await match();
  return mod.default;
}
