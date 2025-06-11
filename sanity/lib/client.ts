import { createClient } from 'next-sanity'
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from '@sanity/client';
import { apiVersion, dataset, projectId, token } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
