import { createClient } from 'next-sanity'
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from '@sanity/client';
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: "skPkVKU2lRgWdshbzttmLNWu2nFTKSHBJWByTTbkxLHMVkbouKLBVQFCB81VTeChMqQYsczOzikuaTqE6i06EYI76zRE0TaicdeTnqAjey4t2ZX37JrxE9HrcDnsGFJsQegVxcoTrYoNvMj8Ocr5G6XAL3jhmWUpog5SHZQy4kytUmUFZsZr"
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
