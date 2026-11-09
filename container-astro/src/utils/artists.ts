export interface Artist {
  name: string;
  photo?: string;
  image?: string;
  bio?: string;
}

export function isMultipleArtists(artists: Artist[] | undefined): boolean {
  return Array.isArray(artists) && artists.length > 1;
}

export function joinArtistNames(artists: Artist[] | undefined): string {
  if (!Array.isArray(artists)) return '';
  return artists.map((artist) => artist.name).join(', ');
}

export function createAnchorTag(title: string): string {
  return title.replace(/ /g, '-').toLowerCase();
}
